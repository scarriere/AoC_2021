const testInput = ["D2FE28"];
const testInput2 = ["38006F45291200"];
const testInput3 = ["EE00D40C823060"];

const hexToBinary: Record<string, string> = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

interface Packet {
  version: number;
  versionCount: number;
  type: number;
  size: number;
  value: number;
  childs: Packet[];
}

function parseLiteral(bins: string): [number, number] {
  let lastGroup = false;
  let ptr = 0;
  let value = "";
  while (!lastGroup) {
    lastGroup = bins[ptr] === "0";
    value += bins.slice(ptr + 1, ptr + 5);
    ptr += 5;
  }
  return [parseInt(value, 2), ptr];
}

function parseEmbededPackets(bins: string): [Packet[], number] {
  const lengthType = bins[0];
  const lengthLength = lengthType === "0" ? 16 : 12;
  const length = parseInt(bins.slice(1, lengthLength), 2);

  let packets = [];
  let ptr = 0;
  let lastPacket = false;
  while (!lastPacket) {
    const packet = parsePacket(bins.slice(lengthLength + ptr, bins.length - 1));
    packets.push(packet);
    ptr += packet.size;
    if (lengthType === "0") {
      lastPacket = ptr >= length;
    } else {
      lastPacket = packets.length >= length;
    }
  }
  return [packets, packets.reduce((a, b) => a + b.size, 0) + lengthLength];
}

function calculateOperation(type: number, packets: Packet[]) {
  switch (type) {
    case 0:
      return packets.reduce((a, b) => a + b.value, 0);
    case 1:
      return packets.reduce((a, b) => a * b.value, 1);
    case 2:
      return Math.min(...packets.map((p) => p.value));
    case 3:
      return Math.max(...packets.map((p) => p.value));
    case 5:
      return packets[0].value > packets[1].value ? 1 : 0;
    case 6:
      return packets[0].value < packets[1].value ? 1 : 0;
    case 7:
      return packets[0].value === packets[1].value ? 1 : 0;
    default:
      throw new Error(`Oupsy ${type}`);
  }
}

function parsePacket(packet: string): Packet {
  if (packet.length < 6) {
    throw new Error("Oupsy");
  }
  const version = parseInt(packet.slice(0, 3), 2);
  const type = parseInt(packet.slice(3, 6), 2);
  const isLiteral = type === 4;

  let childs: Packet[] = [];
  let size = 0;
  let value = 0;

  if (isLiteral) {
    const parsedResult = parseLiteral(packet.slice(6, packet.length));
    value = parsedResult[0];
    size = parsedResult[1];
  } else {
    const parsedResult = parseEmbededPackets(packet.slice(6, packet.length));
    childs = parsedResult[0];
    size = parsedResult[1];
    value = calculateOperation(type, childs);
  }

  return {
    version,
    type,
    value,
    childs,
    size: size + 6,
    versionCount: version + childs.reduce((a, b) => a + b.versionCount, 0),
  };
}

function part1(input: Array<string>) {
  const packet = input[0]
    .split("")
    .map((v) => hexToBinary[v])
    .join("");

  return parsePacket(packet).versionCount;
}

function part2(input: Array<string>) {
  const packet = input[0]
    .split("")
    .map((v) => hexToBinary[v])
    .join("");

  return parsePacket(packet).value;
}

export { part1, part2 };
