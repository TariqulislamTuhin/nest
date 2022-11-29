import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  findAll(getCategoriesDto: GetCategoriesDto) {
    return this.categories;
  }

  findOneById(id: string) {
    const found = this.categories.find(
      (category: Category) => category.id === Number(id),
    );
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createCategoryDto: CreateCategoryDto) {
    const { title } = createCategoryDto;
    const category: Category = {
      id: this.categories.length + 1,
      title,
      slug: slugify(title),
      created_at: new Date(),
    };
    this.categories.push(category);
    return category;
  }
  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const found = this.categories.find(
      (category: Category) => category.id === Number(id),
    );
    if (!found) {
      throw new NotFoundException();
    }
    const { title } = updateCategoryDto;
    found.title = title;
    found.slug = slugify(title);
    const newCategories = [...this.categories].filter(
      (category: Category) => category.id !== Number(id),
    );
    newCategories.push(found);
    this.categories = newCategories;
    return found;
  }
  deleteCategory(id: string) {
    const newCategories = [...this.categories].filter(
      (category: Category) => category.id === Number(id),
    );
    this.categories = newCategories;
  }
}
