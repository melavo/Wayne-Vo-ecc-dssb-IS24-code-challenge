const idLength = 8;

const controller = {};

//This function gets a list of items from a database.
controller.getList = async (req, res) => {
  try {
    const products = req.app.db.data;
    res.send(products);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while retrieving products. Please try again later.",
    });
  }
}

// This function creates a new product in the database.
controller.createProduct = async (req,res) => {
	try {
		const products = req.app.db.data;
		const highestProductId = products.reduce((max, product) => {
			return Math.max(max, parseInt(product.productId));
		}, 0);
		
		const requiredFields = [
			"productName",
			"productOwnerName",
			"Developers",
			"scrumMasterName",
			"startDate",
			"methodology",
		];

		const missingFields = requiredFields.filter(
			(field) => !req.body.hasOwnProperty(field),
		);

		if (missingFields.length > 0) {
			return res.status(400).json({
			  message: "Invalid request data",
			  missingFields: `The following fields are required: ${missingFields.join(
				", ",
			  )}`,
			});
		}

		let location = "";

		if (req.body.hasOwnProperty("location")){
			location = req.body.location
		}
		
		let genId = (highestProductId + 1).toString();
		while (genId.length < idLength) {
			genId = "0" + genId;
		}

		const product = {
			productId: genId,
			productName: req.body.productName,
			productOwnerName: req.body.productOwnerName,
			Developers: req.body.Developers,
			scrumMasterName: req.body.scrumMasterName,
			startDate: req.body.startDate,
			methodology: req.body.methodology,
			location: location,
		};

		req.app.db.data.push(product);
    	req.app.db.write();
		res.status(200).send(product);

	} catch (error) {
		console.error(error);
		res
		  .status(500)
		  .json({ message: "An error occurred while retrieving the product." });
	}
}

// This function updates an existing product in the database.
controller.updateProduct = async (req,res) => {
	try {
		const productId = parseInt(req.params.productId);
		const products = req.app.db.data;
		const index = products.findIndex(
		(product) =>
			parseInt(product.productId) === productId
		);

		if (index === -1) {
			res
        	.status(404)
        	.json({ message: `Product with ID ${productId} not found` });
		} else {
			let foundProduct = products[index];
			foundProduct = {
				productId: req.params.productId,
				productName: req.body.productName,
				productOwnerName: req.body.productOwnerName,
				Developers: req.body.Developers,
				scrumMasterName: req.body.scrumMasterName,
				startDate: req.body.startDate,
				methodology: req.body.methodology,
				location: req.body.location
			};
			req.app.db.data.splice(index, 1);
    		req.app.db.data.push(foundProduct);
    		req.app.db.write();

			const newProduct = req.app.db.data.find(
				(product) =>
				  parseInt(product.productId) === productId
			);

			res
			.status(200)
			.send(newProduct);
		}
		
	} catch (error) {
		console.error(error);
		res
		  .status(500)
		  .json({ message: "An error occurred while retrieving the product." });
	}
}

// This function gets a product from the database by its ID.
controller.getProductById = async (req, res) => {
	try {
		const productId = parseInt(req.params.productId);
		const foundProduct = req.app.db.data.find(
			(product) => parseInt(product.productId) === productId
		);

		if (foundProduct) {
			res.send(foundProduct);
		} else {
		  // If the product is not found, return a 404 error response
		  res
			.status(404)
			.json({ message: `Product with ID ${productId} not found` });
		}
	} catch (error) {
		console.error(error);
		res
		  .status(500)
		  .json({ message: "An error occurred while retrieving the product." });
	}
}

// This function deletes a product from the database by its ID.
controller.delProductById = async (req, res) => {
	try {
		const productId = parseInt(req.params.productId);
		const products = req.app.db.data;
		const index = products.findIndex(
		(product) =>
			parseInt(product.productId) === productId
		);

		if (index !== -1) {
			req.app.db.data.splice(index, 1);
			req.app.db.write();
			res.status(200)
			.send({status:'OK'});
		} else {
			// If the product is not found, return a 404 error response
			res
			  .status(404)
			  .json({ message: `Product with ID ${productId} not found` });
		}
	} catch (error) {
		console.error(error);
		res
		  .status(500)
		  .json({ message: "An error occurred while retrieving the product." });
	}
}

export default controller;
