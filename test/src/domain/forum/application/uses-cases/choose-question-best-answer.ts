import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findbyId(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findbyId(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = new UniqueEntityID(answerId)

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
