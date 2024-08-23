import logo from './logo.svg';
import './App.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';

function App() {
  return (
    <div className='container'>
      <h1 className='mt-3'>지출 계획</h1>
      <div className='row-mt'>
        <div className='col-sm'>
          <Budget />
        </div>
        <div className='col-sm'>
          <Remaining />
        </div>
        <div className='col-sm'>
          <ExtenseTotal />
        </div>
    </div>

    <h3 className='mt-3'>지출들</h3>
    <div className='row'>
      <div className='col-sm'>
        <ExtenseList />
      </div>
    </div>
    </ div>
   
   
  );
}

export default App;
