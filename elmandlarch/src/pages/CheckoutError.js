import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Error() {

	const navigateTo = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigateTo("/");
		}, 3000);
	}, []);

	return (
		<React.Fragment>
			<div className='container d-flex flex-column justify-content-center align-items-center adjust-margin-top pt-5'>
				<h3>Oops. There is an error in the checkout. </h3>
				<p>Please try to checkout again.</p>
			</div>
		</React.Fragment>
	);
}