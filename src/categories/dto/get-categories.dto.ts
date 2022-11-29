import { SortByEnum } from 'src/common/enum';

export class GetCategoriesDto {
  title?: string;
  slug?: string;
  sortBy: SortByEnum;
}
