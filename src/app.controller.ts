import { AppService } from './app.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import ArticleInterface from './entities/article.interface';

@Controller('articles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  async getAll(): Promise<ArticleInterface[]> {
    return await this.appService.getAllArticles();
  }

  @Post()
  async create(@Body() data: ArticleInterface): Promise<ArticleInterface> {
    return await this.appService.createArticle(data);
  }

  @Post(':id')
  async getById(@Param() id: string): Promise<ArticleInterface> {
    return await this.appService.getArticleById(id);
  }

  @Delete(':id')
  async delete(@Param() id: string): Promise<string> {
    return await this.appService.deleteArticle(id);
  }

  // @Get('extract/:url')
  // async extractDataFromUrl(@Param('url') url: string) {
  //   const response = await this.appService.extractDataFromUrl(url);
  //   //return response.objects[0].html;
  //   return (
  //     'Extracting data... <p>' + response + '<p> Take a look at the console :)'
  //   );
  // }
}
