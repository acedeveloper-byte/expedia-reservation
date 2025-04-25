
import Header from "@/components/Header";
import FlightSearch from "@/components/FlightSearch";
import ExploreDestination from "@/components/ExploreDestination";
import ExploreRoutes from "@/components/ExploreRoutes";
import Footer from "@/components/Footer";
import FamousTourist from "@/components/FamousTourist";

export default function Home() {
  return (
   <>
   <Header/>
   <FlightSearch/>

   <ExploreDestination/>

   <ExploreRoutes/>

<FamousTourist/>
   <Footer/>
   </>
  );
}
