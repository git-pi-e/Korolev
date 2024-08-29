<div class="wrapper">
	<div class="earth">
		<div class="earth__shadow-container">
			<div class="earth__shadow" />
		</div>
		<div class="clouds">
			<div class="clouds__group-1" />
		</div>
	</div>
	<div class="earth-aura" />
</div>

<style type="text/scss" lang="scss">
	$trees: #4d7;
	$earth-outline-blue: #111133;
	$earth-aura: #954;
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
		background: #934838;
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
		animation: craters 10s linear infinite;

		&__group-1 {
			position: absolute;
			top: 60%;
			left: 60%;
			background: #732;
			border-radius: 50px;
			width: 20px;
			height: 20px;

			&:after {
				content: '';
				display: block;
				position: absolute;
				top: -500%;
				left: 150%;
				background: #732;
				border-radius: 50px;
				width: 60px;
				height: 60px;
			}

			&:before {
				content: '';
				display: block;
				position: absolute;
				top: -100%;
				left: 100%;
				background: #732;
				border-radius: 50px;
				width: 100px;
				height: 100px;
			}
		}
	}

	@keyframes craters {
		0% {
			transform: translateX(110%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>
