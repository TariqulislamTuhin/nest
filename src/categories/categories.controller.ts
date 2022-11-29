import { Category } from './entity/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get()
  findAll(@Query() getCategoriesDto: GetCategoriesDto): Category[] {
    return this.categoryService.findAll(getCategoriesDto);
  }

  @Get('/:id')
  findOneById(@Param('id') id: string): Category {
    return this.categoryService.findOneById(id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Category {
    return this.categoryService.create(createCategoryDto);
  }
  @Patch('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Category {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
  @Delete('/:id')
  deleteCategory(@Param('id') id: string): void {
    return this.categoryService.deleteCategory(id);
  }
}
