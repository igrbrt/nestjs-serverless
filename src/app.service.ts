//import axios from 'axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import ArticleInterface from './entities/article.interface';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'local',
  endpoint: 'http://localhost:8000',
});

@Injectable()
export class AppService {
  async getAllArticles(): Promise<any> {
    try {
      return dynamoDB
        .scan({
          TableName: 'ArticlesTable',
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createArticle(article: ArticleInterface): Promise<any> {
    const newArticle = {
      id: uuid(),
      ...article,
    };
    try {
      return await dynamoDB
        .put({
          TableName: 'ArticlesTable',
          Item: newArticle,
        })
        .promise();
      //return 'Object Created Successfully';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getArticleById(id: string): Promise<any> {
    try {
      return await dynamoDB
        .get({
          TableName: 'ArticlesTable',
          Key: { id },
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteArticle(id: string): Promise<string> {
    try {
      await dynamoDB.delete({
        TableName: 'ArticlesTable',
        Key: {
          todosId: id,
        },
      });
      return 'Object Deleted Successfully';
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  // async extractDataFromUrl(url: string) {
  //   const options = { method: 'GET', headers: { Accept: 'application/json' } };
  //   const urlBase = 'https://api.diffbot.com/v3/article?url=';
  //   const token = '&token=ec620b7cbcce9e2064d406fade63e941';

  //   try {
  //     const response = await axios(urlBase + url + token, options);
  //     const data = await response.data;
  //     console.log(data.objects[0].text);
  //     return data;
  //   } catch (error) {
  //     console.log('Error on extracting page: ', error);
  //     return 'error';
  //   }
  // }
}
