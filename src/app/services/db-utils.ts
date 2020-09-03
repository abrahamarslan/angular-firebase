import {Course} from '../../model/course';

// tslint:disable-next-line:typedef
export function convertSnaps(snaps) {
  return snaps.map(snap => {
    return {
      id: snap.payload.doc.id,
      ...snap.payload.doc.data() as {}
    };
  });
}
