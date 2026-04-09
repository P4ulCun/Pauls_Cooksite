const recipes = [
  {
    id: "shakshuka",
    title: "Shakshuka",
    description: "Very fast, very nutritious and very easy to make",
    image: "images/shakshuka_image.jpg",
    tags: ["All", "Quick", "Vegetarian", "Breakfast"],
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 2,
    ingredients: [
      { name: "Olive oil", amount: 1, unit: "tbsp" },
      { name: "Tomato sauce", amount: 350, unit: "g" },
      { name: "Onion", amount: 1, unit: "" },
      { name: "Salt", amount: 0, unit: "to taste" },
      { name: "Bell pepper", amount: 1, unit: "" },
      { name: "Pepper", amount: 0, unit: "to taste" },
      { name: "Chilli pepper", amount: 1, unit: "" },
      { name: "Cumin", amount: 0, unit: "to taste" },
      { name: "Garlic", amount: 3, unit: "cloves" },
      { name: "Basil", amount: 0, unit: "to taste" },
      { name: "Zucchini / Eggplant", amount: 1, unit: "" },
      { name: "Eggs", amount: 3, unit: "" }
    ],
    steps: [
      "Cut all the vegetables.",
      "Saute the onion, the peppers, and garlic with a little bit of extra virgin olive oil.",
      "Once softened, add the mushrooms and zucchini/eggplant and continue stirring.",
      "Add the tomato sauce and the aromatics and let it simmer for about 5 minutes.",
      "When the sauce is ready, use the back of a spoon and make some holes in the sauce.",
      "Crack your eggs and nestle each egg in one of the holes you created. Cover the skillet and allow the eggs to simmer in the sauce over medium-low heat until the egg whites have settled."
    ]
  },
  {
    id: "lasagna",
    title: "Lasagna",
    description: "An easy and delicious lasagna recipe perfect in the winter time",
    image: "images/lasagna_image.jpg",
    tags: ["All", "Dinner"],
    prepTime: 30,
    cookTime: 60,
    totalTime: 90,
    servings: 8,
    ingredients: [
      { name: "Ground beef", amount: 1000, unit: "g" },
      { name: "Tomato paste", amount: 2, unit: "tbsp" },
      { name: "Tomato sauce", amount: 1000, unit: "g" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
      { name: "Onion", amount: 1, unit: "" },
      { name: "Lasagna sheets", amount: 1, unit: "box" },
      { name: "Carrot", amount: 2, unit: "" },
      { name: "Garlic", amount: 5, unit: "cloves" },
      { name: "Butter", amount: 70, unit: "g" },
      { name: "Chicken bouillon", amount: 1, unit: "cube" },
      { name: "Flour", amount: 70, unit: "g" },
      { name: "Bay leaf", amount: 1, unit: "" },
      { name: "Milk", amount: 700, unit: "ml" },
      { name: "Salt", amount: 0, unit: "to taste" },
      { name: "Oregano", amount: 0, unit: "to taste" },
      { name: "Pepper", amount: 0, unit: "to taste" },
      { name: "Basil", amount: 0, unit: "to taste" },
      { name: "Rosemary", amount: 0, unit: "to taste" },
      { name: "Chilli flakes", amount: 0, unit: "to taste" }
    ],
    steps: [
      "Heat up a Dutch oven pot with a thin oil film. Brown the meat thoroughly then take it out of the pot and sauté the cubed vegetables. In the same pot fry a bit of tomato paste then add the cooked meat and all the seasoning to taste and simmer for 1 hour.",
      "In the meantime melt the butter in a pot. Then add the flour wisking vigorously until a paste is formed. Slowly add milk, again, wisking vigorously and some salt and pepper to taste.",
      "Now we need to assemble the lasagna. In a baking dish put a thin layer of the Bolognese sauce, then a layer of the pasta sheets, followed by a layer of Bechamel, then again a layer of Bolognese and repeat. Now finish with some grated mozzarella.",
      "Place in the oven at 180°C for about 25 minutes to brown the top."
    ]
  },
  {
    id: "brownie",
    title: "Brownie",
    description: "The perfect recipe for rich, chocolately and fudgy brownies.",
    image: "images/brownie_image.jpg",
    tags: ["All", "Easy", "Dessert"],
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 9,
    ingredients: [
      { name: "Black chocolate", amount: 240, unit: "g" },
      { name: "Vanilla extract", amount: 2, unit: "tsp" },
      { name: "Cocoa powder", amount: 75, unit: "g" },
      { name: "Salt", amount: 2, unit: "pinches" },
      { name: "Butter", amount: 280, unit: "g" },
      { name: "Eggs", amount: 6, unit: "" },
      { name: "Sugar", amount: 400, unit: "g" },
      { name: "Flour", amount: 120, unit: "g" },
      { name: "Brown sugar", amount: 100, unit: "g" }
    ],
    steps: [
      "Melt the butter. In the meantime cut the chocolate finely and add it in a bowl with 25g of cocoa powder. Add the melted butter and whisk until smooth.",
      "In a larger bowl add all the sugar, the vanilla extract, the salt, one egg and mix. Then add 2 more eggs and mix. At last add the remaining eggs and mix for a few minutes.",
      "Add the chocolate-butter mixture and mix. Now add the flour and 50g of cocoa powder and mix the batter lightly with a spatula.",
      "Lastly, pop the mixture in the oven at 180°C for about 35 minutes for a fudgy consistency."
    ]
  }
];
