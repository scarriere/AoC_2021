function visitRoom(
  map: Record<string, string[]>,
  visitedRooms: Set<string>,
  currentRoom: string,
  path: string[]
): string[][] {
  if (currentRoom === "end") {
    return [path];
  }
  return map[currentRoom]
    .filter((room) => !visitedRooms.has(room))
    .map((room) =>
      visitRoom(
        map,
        room === room.toUpperCase()
          ? visitedRooms
          : new Set([...visitedRooms, room]),
        room,
        [...path, room]
      )
    )
    .flat();
}

function visitRoomPart2(
  map: Record<string, string[]>,
  visitedRooms: Set<string>,
  currentRoom: string,
  path: string[],
  twiceDone: boolean
): string[][] {
  if (currentRoom === "end") {
    return [path];
  }
  return map[currentRoom]
    .filter(
      (room) => !visitedRooms.has(room) || (!twiceDone && room !== "start")
    )
    .map((room) =>
      visitRoomPart2(
        map,
        room === room.toUpperCase()
          ? visitedRooms
          : new Set([...visitedRooms, room]),
        room,
        [...path, room],
        twiceDone || visitedRooms.has(room)
      )
    )
    .flat();
}

function part1(input: Array<string>) {
  const nodeMap = input.reduce<Record<string, string[]>>((map, link) => {
    const [a, b] = link.split("-");
    if (!map[a]) {
      map[a] = [];
    }
    if (!map[b]) {
      map[b] = [];
    }
    map[a].push(b);
    map[b].push(a);
    return map;
  }, {});

  return visitRoom(nodeMap, new Set(["start"]), "start", ["start"]).length;
}

function part2(input: Array<string>) {
  const nodeMap = input.reduce<Record<string, string[]>>((map, link) => {
    const [a, b] = link.split("-");
    if (!map[a]) {
      map[a] = [];
    }
    if (!map[b]) {
      map[b] = [];
    }
    map[a].push(b);
    map[b].push(a);
    return map;
  }, {});

  return visitRoomPart2(nodeMap, new Set(["start"]), "start", ["start"], false)
    .length;
}

export { part1, part2 };
