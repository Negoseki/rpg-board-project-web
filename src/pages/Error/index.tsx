import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as {
    status: number;
    data: { message: string };
  };
  console.log(error);
  let title = 'An error ocurred!';
  let message = 'Something went wrong';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page';
  }
  return (
    <div>
      {title}
      <br />
      {message}
    </div>
  );
};
export default ErrorPage;
