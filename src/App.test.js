import * as React from 'react';
import {render, fireEvent, getByText} from '@testing-library/react';
import {App} from './App';
import AddItems from './pages/addItems';

test('card test', () => {
  const {getByText} = render(<App/>);
  getByText('Total : 0$')
});

test('add Item test',()=>{
  const {container,getByText} = render(<AddItems/>);

  const name = container.querySelector(`input[name="name"]`);
  fireEvent.change(name,{target:{value:'potato'}});
  getByText('potato');

  const stack = container.querySelector(`input[name="stack"]`);
  fireEvent.change(stack,{target:{value:'10'}});
  expect(stack.value).toBe("10");

  const price = container.querySelector(`input[name="price"]`);
  fireEvent.change(price,{target:{value:'a'}});
  expect(price.value).not.toBe("a");
  fireEvent.change(price,{target:{value:'2'}});
  expect(price.value).toBe("2");

  const weight = container.querySelector(`input[name="weight"]`);
  fireEvent.change(weight,{target:{value:'8'}});
  expect(weight.value).toBe("8");

  const discount = container.querySelector(`input[name="discount"]`);
  fireEvent.change(discount,{target:{value:'15'}});
  expect(discount.value).toBe("15");

  const img = container.querySelector(`input[name="img"]`);
  fireEvent.change(img,{target:{value:`https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?k=20&m=157430678&s=612x612&w=0&h=dfYLuPYwA50ojI90hZ4jCgKZd5TGnqf24UCVBszoZIA=`}});
  expect(img.value).toBe("https://media.istockphoto.com/photos/three-potatoes-picture-id157430678?k=20&m=157430678&s=612x612&w=0&h=dfYLuPYwA50ojI90hZ4jCgKZd5TGnqf24UCVBszoZIA=");


  const info = container.querySelector(`textarea[name="info"]`);
  fireEvent.change(info,{target:{value:'Potatoes 8 pound just for 2$'}});
  expect(info.value).toBe("Potatoes 8 pound just for 2$");


  
 


});