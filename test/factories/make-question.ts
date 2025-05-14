import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  return Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )
}
