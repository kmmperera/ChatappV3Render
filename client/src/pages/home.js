
import { Link } from 'react-router-dom';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';
import Navbar from './subcomponents/newsubcomponents/navbar';
import Landingpage from './landingpage';
const Home=(props)=>{
	return (
		<>
		<Navbar/>
		<Landingpage/>
		</>
	);
}

export default Home;
