/**
 * if harvesting
 *   stop harvesting if necessary
 *
 *   if at havest position
 *     harvset
 *   else
 *     move
 */

let Actions = {
  IDLE: 0,
  HARVESTING: 1
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ActionInfo {
  constructor(id) {
    this.id = id;
  }
}

class IdleInfo extends ActionInfo {
  constructor(full) {
    super(Actions.IDLE);
    this.full = full;
  }
}

class HarvestInfo extends ActionInfo {
  constructor(sourceId, position, harvesting) {
    super(Actions.HARVESTING);
    this.sourceId = sourceId;
    this.position = position;
    this.harvesting = harvesting;
  }
}

class SourceInfo  {
  constructor(id) {
    this.id = id;
    this.complete = false;
    this.harvestPoints = [];
  }
}

let harvest = function(creep, carryLoad) {
  if(carryLoad < this.gameCreep.carryCapacity) {
    creep.memory.action = new IdleInfo(true);
    return;
  }
};
