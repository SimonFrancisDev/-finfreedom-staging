const { expect } = require("chai");

const LEVELS = Object.freeze({
  1: { engine: "P4", price: 10, nextRequirement: 20 },
  2: { engine: "P12", price: 20, nextRequirement: 40 },
  3: { engine: "P39", price: 40, nextRequirement: 80 },
  4: { engine: "P4", price: 80, nextRequirement: 160 },
  5: { engine: "P12", price: 160, nextRequirement: 320 },
  6: { engine: "P39", price: 320, nextRequirement: 640 },
  7: { engine: "P4", price: 640, nextRequirement: 1280 },
  8: { engine: "P12", price: 1280, nextRequirement: 2560 },
  9: { engine: "P39", price: 2560, nextRequirement: 5120 },
  10: { engine: "P4", price: 5120, nextRequirement: null },
});

function p12Line(position) {
  if (position >= 1 && position <= 3) return 1;
  if (position >= 4 && position <= 12) return 2;
  throw new Error("invalid P12 position");
}

function p12Parent(position) {
  if (p12Line(position) !== 2) return 0;
  return ((position - 4) % 3) + 1;
}

function p12Components(price) {
  return { line1: price * 0.4, line2: price * 0.5, system: price * 0.1 };
}

function p12OwnerDisposition(line, arrival, autoUpgradeEnabled) {
  if (line === 1) return "liquid";
  if (arrival === 8 || arrival === 9) return "recycle";
  if (autoUpgradeEnabled && arrival >= 1 && arrival <= 4) return "escrow";
  return "liquid";
}

function p39Line(position) {
  if (position >= 1 && position <= 3) return 1;
  if (position >= 4 && position <= 12) return 2;
  if (position >= 13 && position <= 39) return 3;
  throw new Error("invalid P39 position");
}

function p39Line2Parent(position) {
  if (position < 4 || position > 12) return 0;
  return ((position - 4) % 3) + 1;
}

function p39Line3Parent(position) {
  if (position < 13 || position > 39) return 0;
  return 4 + ((position - 13) % 9);
}

function p39Line3Grandparent(position) {
  const parent = p39Line3Parent(position);
  return parent === 0 ? 0 : ((parent - 4) % 3) + 1;
}

function p39Components(price) {
  return {
    line1: price * 0.2,
    line2: price * 0.2,
    line3: price * 0.5,
    system: price * 0.1,
  };
}

function p39OwnerDisposition(line, arrival, autoUpgradeEnabled) {
  if (line === 3 && (arrival === 26 || arrival === 27)) return "recycle";
  if (!autoUpgradeEnabled) return "liquid";
  if (line === 1 && arrival === 3) return "escrow";
  if (line === 2 && arrival >= 1 && arrival <= 4) return "escrow";
  if (line === 3 && arrival >= 1 && arrival <= 2) return "escrow";
  return "liquid";
}

describe("Canonical structural protocol model", function () {
  it("maps every level independently to its price, engine and next requirement", function () {
    expect(Object.keys(LEVELS)).to.have.length(10);

    for (let level = 1; level <= 10; level += 1) {
      const expectedPrice = 10 * (2 ** (level - 1));
      const expectedEngine = level % 3 === 1 ? "P4" : level % 3 === 2 ? "P12" : "P39";
      expect(LEVELS[level].price).to.equal(expectedPrice);
      expect(LEVELS[level].engine).to.equal(expectedEngine);
      expect(LEVELS[level].nextRequirement).to.equal(level === 10 ? null : expectedPrice * 2);
    }
  });

  it("keeps P4 owner-only and reaches each automatic-upgrade requirement exactly", function () {
    for (const level of [1, 4, 7, 10]) {
      const { price, nextRequirement } = LEVELS[level];
      const system = price * 0.1;
      const participant = price - system;

      expect(participant).to.equal(price * 0.9);
      if (level < 10) {
        const escrow = (price * 0.2) + participant + participant;
        expect(escrow).to.equal(nextRequirement);
      }
    }
  });

  it("defines every P12 position, parent and fixed line component", function () {
    const expectedChildren = {
      1: [4, 7, 10],
      2: [5, 8, 11],
      3: [6, 9, 12],
    };

    for (let position = 1; position <= 12; position += 1) {
      if (position <= 3) {
        expect(p12Line(position)).to.equal(1);
        expect(p12Parent(position)).to.equal(0);
      } else {
        const parent = p12Parent(position);
        expect(p12Line(position)).to.equal(2);
        expect(expectedChildren[parent]).to.include(position);
      }
    }

    for (const level of [2, 5, 8]) {
      const { price } = LEVELS[level];
      const split = p12Components(price);
      expect(split.line1 + split.line2 + split.system).to.equal(price);
      expect(split).to.deep.equal({
        line1: price * 0.4,
        line2: price * 0.5,
        system: price * 0.1,
      });
    }
  });

  it("uses P12 qualifying line-2 arrivals for escrow, liquid and two-fill recycle", function () {
    for (const level of [2, 5, 8]) {
      const { price, nextRequirement } = LEVELS[level];
      const ownerComponent = p12Components(price).line2;

      expect([1, 2, 3, 4].map((arrival) => p12OwnerDisposition(2, arrival, true)))
        .to.deep.equal(["escrow", "escrow", "escrow", "escrow"]);
      expect(ownerComponent * 4).to.equal(nextRequirement);
      expect([5, 6, 7].map((arrival) => p12OwnerDisposition(2, arrival, true)))
        .to.deep.equal(["liquid", "liquid", "liquid"]);
      expect([8, 9].map((arrival) => p12OwnerDisposition(2, arrival, true)))
        .to.deep.equal(["recycle", "recycle"]);
      expect(ownerComponent * 2).to.equal(price);
    }
  });

  it("defines every P39 position, parent, grandparent and fixed component", function () {
    for (let position = 1; position <= 39; position += 1) {
      const line = p39Line(position);
      if (line === 1) {
        expect(p39Line2Parent(position)).to.equal(0);
        expect(p39Line3Parent(position)).to.equal(0);
      } else if (line === 2) {
        expect(p39Line2Parent(position)).to.be.within(1, 3);
      } else {
        expect(p39Line3Parent(position)).to.be.within(4, 12);
        expect(p39Line3Grandparent(position)).to.be.within(1, 3);
      }
    }

    for (const level of [3, 6, 9]) {
      const { price } = LEVELS[level];
      const split = p39Components(price);
      expect(split.line1 + split.line2 + split.line3 + split.system).to.equal(price);
      expect(split).to.deep.equal({
        line1: price * 0.2,
        line2: price * 0.2,
        line3: price * 0.5,
        system: price * 0.1,
      });
    }
  });

  it("uses P39 qualifying arrivals for escrow and two-fill recycle", function () {
    for (const level of [3, 6, 9]) {
      const { price, nextRequirement } = LEVELS[level];
      const split = p39Components(price);
      const escrow = split.line1 + (4 * split.line2) + (2 * split.line3);

      expect(p39OwnerDisposition(1, 3, true)).to.equal("escrow");
      for (let arrival = 1; arrival <= 4; arrival += 1) {
        expect(p39OwnerDisposition(2, arrival, true)).to.equal("escrow");
      }
      for (let arrival = 1; arrival <= 2; arrival += 1) {
        expect(p39OwnerDisposition(3, arrival, true)).to.equal("escrow");
      }
      expect(escrow).to.equal(nextRequirement);
      expect(p39OwnerDisposition(3, 26, true)).to.equal("recycle");
      expect(p39OwnerDisposition(3, 27, true)).to.equal("recycle");
      expect(split.line3 * 2).to.equal(price);
    }
  });

  it("keeps connected component roles separate even when receivers match", function () {
    const split = p39Components(40);
    const components = [
      { role: "line1", amount: split.line1 },
      { role: "line2", amount: split.line2 },
      { role: "line3", amount: split.line3 },
    ];

    expect(components).to.deep.equal([
      { role: "line1", amount: 8 },
      { role: "line2", amount: 8 },
      { role: "line3", amount: 20 },
    ]);
    expect(components).to.have.length(3);
  });
});
