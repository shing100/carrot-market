This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## PlanetScale
WSL 사용시
1. https://github.com/planetscale/cli#linux 접속
2. releases를 클릭하여 해당 링크에 접속
3. pscale_0.93.0_linux_amd64.deb 다운(ubuntu를 사용중인 경우)
4. 다운로드된 경로로 이동하여 $ sudo dpkg --install pscale_0.93.0_linux_amd64.deb
5. $ pscale 로 잘 설치됐는지 확인

## PlanetScale CLI
1. $ pscale auth login

## npx prisma studio
## npx prisma db push

## Prisma Client
TypeScript 및 Node.js용 직관적인 데이터베이스 클라이언트
- Prisma Client는 생각하는 방식으로 구성하고 앱에 맞춤화된 유형으로 Prisma 스키마에서 자동 생성되는 쿼리 빌더
- npm install @prisma/client
```
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```
https://www.prisma.io/docs/concepts/components/prisma-client

- API route는 Next.js로 API를 빌드하기 위한 솔루션을 제공 
- pages/api 폴더 내의 모든 파일은 /api/*에 매핑되며 API endpoint로 처리
- server-side 전용 번들이며 client-side 번들 크기를 늘리지 않음
- req: http.IncomingMessage의 인스턴스와 pre-built된 일부 미들웨어
- res: http.ServerResponse의 인스턴스와 일부 helper함수
- 예를 들어 다음 API 경로 pages/api/user.js는 상태 코드가 200인 json 응답을 반환
```
export default function handler(req, res) {
res.status(200).json({ name: 'John Doe' })
}
```
https://nextjs.org/docs/api-routes/introduction


## Twilio
Twilio는 전화 걸기 및 받기, 문자 메시지 보내기 및 받기, 웹 서비스 API를 사용하여 기타 커뮤니케이션 기능 수행을 위한 프로그래밍 가능한 커뮤니케이션 도구를 제공합니다.
> https://www.twilio.com/

### Twilo Document
> https://www.twilio.com/docs

### Messaging Services
- 메시징 서비스는 특정 사용 사례 및 메시징 캠페인을 위한 메시징 기능을 번들로 제공하는 컨테이너
- 특정 채널 및 번호 유형 중에서 선택하여 발신자를 메시징 서비스와 일치시키십시오.

### https://github.com/vvo/iron-session

### https://authjs.dev/reference/adapter/prisma

### https://swr.vercel.app/ko/docs/with-nextjs


## Mutaion
- useSWRConfig() hook으로부터 mutate 함수를 얻을 수 있으며, mutate(key)를 호출하여 동일한 키를 사용하는 다른 SWR hook*에게 revalidation 메시지를 전역으로 브로드캐스팅할 수 있다.
- mutate를 사용하면 로컬 데이터를 업데이트하는 동시에 유효성을 다시 검사하고 최종적으로 최신 데이터로 바꿀 수 있다.
```
const { mutate } = useSWRConfig();

// 로컬 데이터를 즉시 업데이트하지만, revalidation은 비활성화
mutate('/api/user', { ...data, name: newName }, false)

// 이 키가 있는 모든 SWR에 revalidate하도록 하고, 로컬 데이터가 올바른지 확인하기 위해 갱신(refetch) 트리거 ("/api/user"에 refetch를 함)
mutate('/api/user');
```
> https://swr.vercel.app/docs/mutation

### Relation count
- https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#filter-the-relation-count


### cloudflare

#### Remote Images
- 원격 이미지를 사용하려면 src 속성이 URL 문자열이어야 하며 relative 또는 absolute일 수 있습니다. Next.js는 빌드 프로세스 동안 원격 파일에 액세스할 수 없으므로 width, height 및 선택적 blurDataURL props을 수동으로 제공해야 합니다.
> https://nextjs.org/docs/basic-features/image-optimization#remote-images

- Domains
-이때 Next.js 이미지 최적화 API를 사용하면서 원격 이미지에 접근하고 싶을 수 있습니다. 이렇게 하려면 loader를 기본 설정으로 두고 이미지 src에 대한 절대 URL을 입력합니다.
- 악의적인 사용자로부터 애플리케이션을 보호하려면 이러한 방식으로 접근하려는 원격 도메인 목록을 아래와 같이 next.config.js 파일에 정의해야 합니다.

// next.config.js
```
module.exports = {
images: {
domains: ['example.com', 'example2.com'],
},
}
```
> https://nextjs.org/docs/basic-features/image-optimization#domains

- next/image 구성되지 않은 호스트
> https://nextjs.org/docs/messages/next-image-unconfigured-host#why-this-error-occurred