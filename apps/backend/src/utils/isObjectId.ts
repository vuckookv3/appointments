import mongoose from 'mongoose';

export const isObjectId = (id: string): boolean => {
	return mongoose.Types.ObjectId.isValid(id);
};
