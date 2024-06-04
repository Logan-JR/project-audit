import Post from "@/ui/cpa/post/post";

const PostPage = ({ searchParams }) => {
  return (
    <>
      <h3>PostPage</h3>
      <Post searchParams={searchParams} />
    </>
  );
};

export default PostPage;
