const code = [
  `.create.section {
    overflow: hidden;
}

.create.section .text.block {
    align-self: center;
    grid-column: 2;
    grid-row: 2;
    text-align: center;
}

.create.section .text.block > h2 {
    color: #ACBA07
}

.create.section .icon.view-a {
    position: relative;
    animation: 10s linear 0s infinite alternate scroll-back-forward;
    grid-column: 1 / 4;
    grid-row: 1;
    left: -60px;
}

.create.section .icon.view-b {
    position: relative;
    animation: 10s linear 0s infinite alternate scroll-forward-back;
    grid-column: 1 / 4;
    grid-row: 4;
    left: -160px;
}

.create.section img {
    width: max-content;
    height: max-content;
}`,
  `import { userByUsername } from ".";
import { Authorization } from "../../common/authorization/types";
import { UnauthorizedException } from "../../common/exceptions";
import { UserNotFoundException } from "./exceptions";
import { IUserByUsernameSuccessResponseSchema } from "./types";
import myzod from 'myzod';

test("request a valid username, return IUserByUsernameSuccessResponse", () => {
  expect(
    IUserByUsernameSuccessResponseSchema.try(
      userByUsername("username", ({} as unknown) as Authorization)
    )
  ).not.toBeInstanceOf(myzod.ValidationError);
});

test("request an not-existed username, return UserNotFoundException", () => {
  expect(() =>
    userByUsername("akdolkmsqldlaa", ({} as unknown) as Authorization)
  ).toThrowError(UserNotFoundException);
});

test("request with an invalid token, return UnauthorizedException", () => {
  expect(() =>
    userByUsername("akdolkmsqldlaa", ({} as unknown) as Authorization)
  ).toThrowError(UnauthorizedException);
});   
`,
  `import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    InfoModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}`,
  `export class UnauthorizedException extends Error {
  constructor() {
    super("Check your Bearer token.");
    this.name = "UnauthorizedException"
  }
}

export class RateLimitException extends Error {
  constructor() {
    super("Wait for a while.");
    this.name = "RateLimitException"
  }
}

export class UnknownException extends Error {
  constructor(data: Record<string, unknown>) {
    super(JSON.stringify(data))
    this.name = "UnknownException"
  }
}`,
  `html
  head
    meta(charset='UTF-8')
  body
    +title('管理備審資料', '備審資料') //- 連同 title 標籤都會一起設定。
    +top // Back to Top!

    section.section
      .container
        +articleTitle('其他資料的用處在哪？要怎麼提交給大學端阿？')
        .columns
          .column
            h3.title.is-3.step-title Step 1
            h5.subtitle.is-5.step-subtitle.content 
              ul
                li 要先有校系資料。#[a(href='add.html') 怎麼新增？]
                li 其他資料的檔案櫃要先有火鍋料。#[a(href='/epf/others.html') 怎麼新增？]
          .column
            img.lazyload(data-src='/assets/epf/epfothers_value.png' alt='其他資料檔案櫃要有資料')
`,
  `def search(self, search: str, page: int = 1) -> list[SearchResult]:
  return self._get_json(
      self._build_uri('search'),
      {'page': str(page), 'search': search,
          '_fields': 'id,title'}
  )

def get_post_content(self, post_id: int) -> str:
  post = self._get_json(
      self._build_uri(f'posts/{post_id}'),
      {'_fields': 'content'}
  )['content']['rendered']

  return post

def batch_convert_categories_in_PostsBrief(self, pb: list[PostsBrief]) -> list[PostsBrief]:
  '''
  Batch converting the number categories in <pb> to the human-readable categories.
  '''
  for i in pb:
      i['categories'] = list(
          map(self.get_category_name_map, i['categories']))
  return pb`
];
