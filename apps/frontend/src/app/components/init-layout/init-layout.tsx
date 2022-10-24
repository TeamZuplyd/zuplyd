/* eslint-disable-next-line */
// export interface InitLayoutProps {
//   {children};
// }

export function InitLayout({ children }) {
  return (
    <div className="init-bg">
      {/* <h1>Welcome to InitLayout!</h1> */}
      {children}
      {/* <h3>Layout Ends</h3> */}
    </div>
  );
}

export default InitLayout;
