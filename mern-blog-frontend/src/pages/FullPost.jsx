import React from "react";
import { useParams } from 'react-router-dom'
import ReactMarkDown from 'react-markdown';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
const {id} = useParams();

React.useEffect(() => {
  axios.get('/posts/${id').then(res => {
    setData(res.data);
    setLoading(false);
  }).catch(err => {
    console.warn(err);
    alert('Ошибка при получении статьи');
  });
}, []);
if (isLoading) {
  return <Post is Loading={isLoading} isFullPost />;
}
  return (
    <>
      <Post
        id={data._.id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${imageUrl}` : ''}
        //imageUrl=https://www.google.com/search?q=rfhnbyrb&oq=rfhnbyrb&aqs=chrome..69i57j0i10i433i512j0i10i512j0i10i433i512l2j0i10i131i433i512l2j0i10i433i512j0i131i433i650j0i10i512.1626j0j7&sourceid=chrome&ie=UTF-8#imgrc=sFdtcobkD4RVRM
        user={data.user}
        createdAt={data.createdAt}h
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Михаил Коровин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Mikhail Korovin",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
