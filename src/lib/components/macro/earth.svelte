<div class="wrapper">
	<div class="earth">
		<div class="earth__shadow-container">
			<div class="earth__shadow" />
		</div>
		<div class="clouds">
			<div class="clouds__group-1" />
			<div class="clouds__group-2" />
		</div>
		<div class="trees">
			<div class="trees__group-1" />
			<div class="trees__group-2" />
		</div>
	</div>
	<div class="earth-aura" />
</div>

<style type="text/scss" lang="scss">
	$trees: #4d7;
	$earth-outline-blue: #113;
	$earth-aura: #13a;
	%centerElement {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.wrapper {
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 500px;
		overflow: hidden;
	}
	.earth {
		position: relative;
		width: 300px;
		height: 300px;
		@extend %centerElement;
		background: #208bd2;
		border: solid 1% #0a1436;
		border-radius: 50%;
		z-index: 0;
		overflow: hidden;

		&__shadow-container {
			position: absolute;
			left: 50%;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		&__shadow {
			position: absolute;
			top: 0;
			left: -50%;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.2);
			border-radius: 50%;
			z-index: 1000;
		}
	}
	.earth-aura {
		&:after {
			content: '';
			display: block;
			position: absolute;
			width: 400px;
			height: 400px;
			@extend %centerElement;
			border-radius: 50%;
			background: $earth-aura;
			opacity: 0.6;
			z-index: -2;
		}
		&:before {
			content: '';
			display: block;
			position: absolute;
			width: 500px;
			height: 500px;
			@extend %centerElement;
			border-radius: 50%;
			background: $earth-aura;
			opacity: 0.4;
			z-index: -3;
		}
	}
	.clouds {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		animation: clouds 10s linear infinite;

		&__group-1 {
			position: absolute;
			top: 50%;
			left: 10%;
			background: #fff;
			border-radius: 50px;
			opacity: 0.85;
			width: 100px;
			height: 20px;
			box-shadow: -10% -10% 0 rgba(255, 255, 255, 0.8);

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: -500%;
				left: 150%;
				background: #fff;
				border-radius: 50px;
				opacity: 0.8;
				width: 120px;
				height: 30px;
			}

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: -100%;
				left: 100%;
				background: #fff;
				border-radius: 50px;
				opacity: 0.8;
				width: 140px;
				height: 40px;
				box-shadow: 10% 5% 0 rgba(255, 255, 255, 1);
			}
		}

		&__group-2 {
			position: absolute;
			top: 25%;
			left: 25%;
			background: #fff;
			border-radius: 50px;
			opacity: 0.85;
			width: 80px;
			height: 10px;
			box-shadow: 10% 5% 0 rgba(255, 255, 255, 1);

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: 200%;
				left: -50%;
				width: 60px;
				height: 10px;
				background: #fff;
				border-radius: 50px;
				box-shadow: -5% 5% 0 rgba(255, 255, 255, 1);
			}
			&:before {
				content: '';
				display: block;
				position: absolute;
				top: 200%;
				left: -100%;
				width: 100px;
				height: 10px;
				background: #fff;
				border-radius: 50px;
			}
		}
	}
	.trees {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		animation: trees 15s linear infinite;

		&__group-1 {
			position: absolute;
			top: 75%;
			left: 20%;
			width: 100px;
			height: 40px;
			background: $trees;
			border-radius: 50px;

			&:after {
				content: '';
				position: absolute;
				display: block;
				top: -150%;
				left: 70%;
				width: 150px;
				height: 40px;
				background: $trees;
				border-radius: 50px;
			}

			&:before {
				content: '';
				position: absolute;
				display: block;
				top: -200%;
				left: -50%;
				width: 80px;
				height: 20px;
				background: $trees;
				border-radius: 50px;
			}
		}

		&__group-2 {
			position: absolute;
			top: 50%;
			left: 70%;
			width: 60px;
			height: 10px;
			background: $trees;
			border-radius: 50px;

			&:after {
				content: '';
				position: absolute;
				display: block;
				top: -150%;
				left: 70%;
				width: 70px;
				height: 15px;
				background: $trees;
				border-radius: 50px;
			}
			&:before {
				content: '';
				position: absolute;
				display: block;
				top: -100%;
				left: -50%;
				width: 90px;
				height: 30px;
				background: $trees;
				border-radius: 50px;
			}
		}
	}

	@keyframes clouds {
		0% {
			transform: translateX(110%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	@keyframes trees {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-150%);
		}
	}
</style>
