import { BadRequestException } from '@nestjs/common';

export const checkNotNullParams = (params) => {
  const emptyParams = [];

  Object.entries(params).forEach(([key, value]) => {
    if (!value) {
      emptyParams.push(key);
    }
  });

  if (emptyParams.length) {
    throw new BadRequestException(`${emptyParams.join()} is a required fields`);
  }
};
