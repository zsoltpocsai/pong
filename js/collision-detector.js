
class CollisionDetector {
  overlap(o1, o2) {
    let overlapX, overlapY;

    overlapY = Math.max(
      0, 
      Math.min(o1.position.y + o1.height, o2.position.y + o2.height) - 
      Math.max(o1.position.y, o2.position.y)
    );

    overlapX = Math.max(
      0,
      Math.min(o1.position.x + o1.width, o2.position.x + o2.width) -
      Math.max(o1.position.x, o2.position.x)
    );

    return {x: overlapX, y: overlapY};
  }

  control(movingObjects, staticObjects, apply=null) {
    // detects if there is any collision between moving and static objects
    // and reacts so that overlaps doesn't happen
    for (let movingObject of movingObjects) {
      for (let staticObject of staticObjects) {

        let overlap = this.overlap(movingObject, staticObject);

        if (overlap.x == 0 || overlap.y == 0) continue;

        //sampling with smaller speed
        movingObject.position.x -= movingObject.velocity.x;
        movingObject.position.y -= movingObject.velocity.y;
        let saveSpeed = movingObject.speed;
        movingObject.setSpeed(4);
        overlap = this.overlap(movingObject, staticObject);
        let max = 20;
        while (overlap.x == 0 || overlap.y == 0) {
          movingObject.move();
          overlap = this.overlap(movingObject, staticObject);
          max -= 1;
          if (max <= 0) break;
        }
        movingObject.setSpeed(saveSpeed);
        
        if (overlap.x <= overlap.y) {
          movingObject.position.x -= movingObject.direction.x * overlap.x;
        } else {
          movingObject.position.x -= movingObject.direction.x * overlap.x;
        }

        if (apply) {
          const collision = {overlap, movingObject, staticObject};
          apply(collision);
        }
      }
    }
  }
}

export default CollisionDetector;