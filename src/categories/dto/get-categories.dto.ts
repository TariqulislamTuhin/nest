import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortByEnum } from 'src/common/enum';

export class GetCategoriesDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(SortByEnum)
  sortBy: SortByEnum;
}
