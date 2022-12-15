import React from 'react';
import Modal from '@material-ui/core/Modal';
import './Style.css';

export default function Model({text,setText,addItem}) {

const [open, setOpen] = React.useState(false);

const handleClose = () => {
	setOpen(false);
};
	
const handleOpen = () => {
	setOpen(true);
};


return (
	<div style={{ display: 'block', padding: 30 }}>
	<button className='btn' type="button" 
	onClick={handleOpen}>
		New Task +
	</button>
	<Modal
		onClose={handleClose}
		open={open}
		style={{
		position: 'absolute',
		border: '2px solid white',
		backgroundColor: '#8dcb80',
		boxShadow: '2px solid black',
		height:100,
		width: 240,
		margin: 'auto'
		}}
	>
		 <div style={{textAlign:'center'}}>
        <input type={text} value={text} onChange={(e)=>setText(e.target.value)}/>
        <button onClick={addItem}>Add</button>
      </div>
	</Modal>
	</div>
);
}
