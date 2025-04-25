import { ValidateAreaDto } from '../dto/validate.area';
import { PropertyAreaIssueException } from '../exceptions/property.exception';

export const validateArea = ({
  vegetationArea,
  arableArea,
  totalArea,
}: ValidateAreaDto): void => {
  const sum = arableArea + vegetationArea;
  if (sum > totalArea) PropertyAreaIssueException();
};
