
import {
    firebaseReducer,
} from 'react-redux-firebase'
import { PointData } from '../../data/PointData';

interface Schema {
    points: PointData
}

export const fbReducer = (state: any, action: any) => firebaseReducer<{}, Schema>(state, action);
