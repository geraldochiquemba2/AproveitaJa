import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/lib/cart";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import SellerDashboard from "@/pages/SellerDashboard";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import AdminPanel from "@/pages/AdminPanel";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/registro" component={Register} />
      <Route path="/vendedor/dashboard" component={SellerDashboard} />
      <Route path="/produto/:id" component={ProductDetail} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/carrinho" component={Cart} />
      <Route path="/sobre" component={About} />
      <Route path="/contato" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
