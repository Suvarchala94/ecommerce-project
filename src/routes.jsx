import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/Home";
import { SearchResultsPage } from "./pages/SearchResults";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/Register";
import { PDPPage } from "./pages/PDP";
import { CartPage } from "./pages/cart";
import { AppContext } from "./appContext";
import { DeliveryPage } from "./pages/PDP/Delivery";
import { PaymentsPage } from "./pages/Payments";
import { ConfirmationPage } from "./pages/Confirmation";

// export function AppRoutes(props) {
//   let MainBody = HomePage;
//   if (props.currentPage === "/search") MainBody = SearchResultsPage;

//   return (
//     <div>
//       <Header navigateTo={props.navigateTo} />
//       <MainBody />
//       <Footer />

//     </div>
//   );
// }

function PublicLayout({ children }) {
  return (
    <div>
      <Header /> {children}
      <Footer />
    </div>
  );
}





function AuthLayout({ children }) {
  return (
    <div>
      <Header /> {children}
      <Footer />
    </div>
  );
}



function PrivateLayout({ children }) {
  const ctx = React.useContext(AppContext);
  if (ctx.getCurrentUserId()) {
    return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
  return <div>Please Login</div>;
}
 
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* public */}
        <Route
          path="/"
          exact
          render={() => (
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <PublicLayout>
              <SearchResultsPage />
            </PublicLayout>
          )}
        />
        <Route
          path="/prod/:productId/*"
          render={({ match }) => (
            <PublicLayout>
              <PDPPage productId={match.params.productId} />
            </PublicLayout>
          )}
        />
        {/* user -auth */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/account"
          element={
            <AuthLayout>
              <AccountPage />
            </AuthLayout>
          }
        />
        {/* authenticated/private */}
        <Route
          path="/cart"
          render={() => (
            <PrivateLayout>
              <CartPage />
            </PrivateLayout>
          )}
        />
        <Route
          path="/delivery"
          render={() => (
            <PrivateLayout>
              <DeliveryPage />
            </PrivateLayout>
          )}
        />
        <Route
          path="/payments"
          render={() => (
            <PrivateLayout>
              <PaymentsPage />
            </PrivateLayout>
          )}
        />
        <Route
          path="/confirmation"
          render={() => (
            <PrivateLayout>
              <ConfirmationPage />
            </PrivateLayout>
          )}
        />
        <Route path="*" element={<Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}
