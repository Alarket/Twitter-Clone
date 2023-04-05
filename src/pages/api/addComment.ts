import type { NextApiRequest, NextApiResponse } from 'next'
import { CommentBody } from '../../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comment: CommentBody = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          comment: comment.comment,
          username: comment.username,
          profileImage: comment.profileImage,
          tweet: {
            _type: 'reference',
            _ref: comment.tweetId,
          },
        },
      },
    ],
  }

  const result = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-04-04/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutations),
      method: 'POST',
    }
  )

  const json = await result.json()
  console.log(json)

  res.status(200).json({ message: 'Done!' })
}