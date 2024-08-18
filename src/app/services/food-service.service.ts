import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDoc, getDocs, onSnapshot, query } from '@angular/fire/firestore';
import { Diet } from '@models/diet';
import { Food } from '@models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  cereales: Food[] = [
    { name: "Pan de espelta", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Pasta de espelta", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Cereales de desayuno de espelta", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Pan de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Pasta de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Cereales de desayuno de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Alimentos y cereales sin gluten", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Arroz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Maíz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Patata", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Mijo", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Sorgo", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Quinoa", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Tapioca", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Yuca", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Trigo sarraceno", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Harina de arroz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Sémola de arroz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Tortitas de arroz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Tortitas de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Tortitas de maíz", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Galletas de espelta", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Galletas de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Galletas sin gluten", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Polenta", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Arepas", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Puré de patata sin leche", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Salvado de avena", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" },
    { name: "Semillas de lino", category: "CEREALES, LEGUMBRES Y TUBÉRCULOS", fodmap: "Sí" }
  ]
  carnes: Food[] = [
    { name: "Carne de cerdo", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Carne de ternera", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Carne de pollo", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Carne de pavo", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Carne de cordero", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Pescado blanco", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Pescado azul", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Jamón serrano", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Jamón cocido sin lactosa", category: "CARNES Y PESCADOS", fodmap: "Sí" },
    { name: "Huevos", category: "CARNES Y PESCADOS", fodmap: "Sí" }
  ];
  
  lacteos : Food[] = [
    { name: "Leche sin lactosa", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Yogur sin lactosa", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Queso sin lactosa", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Mantequilla sin lactosa", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Leche de almendra", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Leche de arroz", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" },
    { name: "Leche de coco", category: "LÁCTEOS Y DERIVADOS", fodmap: "Sí" }
  ]

  frutas: Food[] = 
  [
    { name: "Banana", category: "FRUTAS", fodmap: "Sí" },
    { name: "Fresas", category: "FRUTAS", fodmap: "Sí" },
    { name: "Uvas", category: "FRUTAS", fodmap: "Sí" },
    { name: "Kiwi", category: "FRUTAS", fodmap: "Sí" },
    { name: "Mandarina", category: "FRUTAS", fodmap: "Sí" },
    { name: "Melón", category: "FRUTAS", fodmap: "Sí" },
    { name: "Naranja", category: "FRUTAS", fodmap: "Sí" },
    { name: "Papaya", category: "FRUTAS", fodmap: "Sí" },
    { name: "Piña", category: "FRUTAS", fodmap: "Sí" }
  ]

  verduas: Food[] =[
    { name: "Acelgas", category: "VERDURAS", fodmap: "Sí" },
    { name: "Albahaca", category: "VERDURAS", fodmap: "Sí" },
    { name: "Berenjena", category: "VERDURAS", fodmap: "Sí" },
    { name: "Calabacín", category: "VERDURAS", fodmap: "Sí" },
    { name: "Calabaza", category: "VERDURAS", fodmap: "Sí" },
    { name: "Cebolla verde", category: "VERDURAS", fodmap: "Sí" },
    { name: "Cilantro", category: "VERDURAS", fodmap: "Sí" },
    { name: "Espinaca", category: "VERDURAS", fodmap: "Sí" },
    { name: "Jengibre", category: "VERDURAS", fodmap: "Sí" },
    { name: "Lechuga", category: "VERDURAS", fodmap: "Sí" },
    { name: "Pepino", category: "VERDURAS", fodmap: "Sí" },
    { name: "Pimiento rojo", category: "VERDURAS", fodmap: "Sí" },
    { name: "Rúcula", category: "VERDURAS", fodmap: "Sí" },
    { name: "Tomate", category: "VERDURAS", fodmap: "Sí" },
    { name: "Zanahoria", category: "VERDURAS", fodmap: "Sí" }
  ]
bebidas : Food[] = [
  { name: "Café", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Té verde", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Té de menta", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Té de jengibre", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Agua con gas", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Refresco de cola sin cafeína", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Vino tinto", category: "BEBIDAS", fodmap: "Sí" },
  { name: "Vino blanco", category: "BEBIDAS", fodmap: "Sí" }
]
  

endulzantes : Food[] = [
  { name: "Azúcar común", category: "ENDULZANTES", fodmap: "Sí" },
  { name: "Stevia", category: "ENDULZANTES", fodmap: "Sí" },
  { name: "Jarabe de arce", category: "ENDULZANTES", fodmap: "Sí" },
  { name: "Jarabe de arroz", category: "ENDULZANTES", fodmap: "Sí" },
  { name: "Melaza", category: "ENDULZANTES", fodmap: "No" }
]


  constructor(private firestore : Firestore) {}

  async addFood(name: string, category: string, fodmap: string) {
    const docRef = await addDoc(collection(this.firestore, "foods"), {
      name: name,
      category: category,
      fodmap: fodmap
    });
    console.log("Document successfully written!", docRef.id);
  }

  async getFoodByName(name: string) {
    const q = query(collection(this.firestore, "foods"));
    const querySnapshot = await getDocs(q);
    let result = null;
    querySnapshot.forEach((doc) => {
      if(doc.data()['name'] == name){
        result = doc.data();
      } 
    });
    return result;
  }


  async addAllFoods() {
    this.carnes.forEach(carne => {
      this.addFood(carne.name, carne.category, carne.fodmap);
    });
    this.cereales.forEach(cereal => {
      this.addFood(cereal.name, cereal.category, cereal.fodmap);
    });
    this.lacteos.forEach(lacteo => {
      this.addFood(lacteo.name, lacteo.category, lacteo.fodmap);
    });
    this.frutas.forEach(fruta => {
      this.addFood(fruta.name, fruta.category, fruta.fodmap);
    });
    this.verduas.forEach(verdura => {
      this.addFood(verdura.name, verdura.category, verdura.fodmap);
    });
    this.bebidas.forEach(bebida => {
      this.addFood(bebida.name, bebida.category, bebida.fodmap);
    });
    this.endulzantes.forEach(endulzante => {
      this.addFood(endulzante.name, endulzante.category, endulzante.fodmap);
    });

  }

  async getAllFoodsNames(){
      const foods: any[] = [];
      const q = query(collection(this.firestore, "foods"));
     

      // Subscribe to changes in the collection
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const food = change.doc.data()['name'];
            foods.push(food);
          }
          if (change.type === "modified") {
            const food = change.doc.data()['name'];
            const index = foods.findIndex((item) => item === food);
            if (index !== -1) {
              foods[index] = food;
            }
          }
          if (change.type === "removed") {
            const food = change.doc.data()['name'];
            const index = foods.findIndex((item) => item === food);
            if (index !== -1) {
              foods.splice(index, 1);
            }
          }
        });
      });

      return foods; 
  }

  async getAllCategories(){
    const categories: any[] = [];
    const q = query(collection(this.firestore, "foods"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if(!categories.includes(doc.data()['category']))
      categories.push(doc.data()['category']);
    });
    return categories;
  }


  async getDiet(){

    const diet: Diet = new Diet([], [], []);
    const q = query(collection(this.firestore, "diets"));
    const querySnapshot = await getDocs(q);
    const randomIndex = Math.floor(Math.random() * querySnapshot.size);
    const randomDoc = querySnapshot.docs[randomIndex].data();
    diet.breakfast = randomDoc['breakfast'];
    diet.lunch = randomDoc['lunch'];
    diet.dinner = randomDoc['dinner'];
    return diet;

    

}


async saveDiet(diet : Diet){
  const docRef = await addDoc(collection(this.firestore, "diets"), {
    breakfast: diet.breakfast,
    lunch: diet.lunch,
    dinner: diet.dinner
  });
  console.log("Document successfully written!", docRef.id);
}


async saveDiets(){
  const diet_day1: Diet = {
    breakfast: [
        "Pan de espelta tostado con mantequilla sin lactosa",
        "Yogur sin lactosa con fresas y salvado de avena",
        "Té verde"
    ],
    lunch: [
        "Pechuga de pollo a la plancha",
        "Quinoa con calabacín, zanahoria y pimiento rojo salteados",
        "Melón",
        "Agua con gas"
    ],
    dinner: [
        "Pescado blanco al horno con limón y cilantro",
        "Patata asada con espinacas salteadas",
        "Mandarina",
        "Té de menta"
    ]
};

const diet_day2: Diet = {
    breakfast: [
        "Cereales de desayuno de avena con leche de almendra",
        "Banana",
        "Café con leche sin lactosa"
    ],
    lunch: [
        "Carne de ternera a la parrilla",
        "Arroz con lechuga, tomate y pepino",
        "Naranja",
        "Agua con gas"
    ],
    dinner: [
        "Huevos revueltos con espinacas y pimiento rojo",
        "Arepas de maíz",
        "Fresas",
        "Té de jengibre"
    ]
};

const diet_day3: Diet = {
    breakfast: [
        "Galletas de espelta con mantequilla sin lactosa",
        "Leche de arroz",
        "Uvas frescas",
        "Té de menta"
    ],
    lunch: [
        "Carne de cordero al horno con jengibre",
        "Polenta con berenjena y calabaza",
        "Melón",
        "Vino blanco (opcional)"
    ],
    dinner: [
        "Jamón serrano con tortilla de patata",
        "Ensalada de rúcula con albahaca y aceite de oliva",
        "Kiwi",
        "Té verde"
    ]
};
const diet_day4: Diet = {
  breakfast: [
      "Tortitas de arroz con mantequilla sin lactosa",
      "Leche de coco",
      "Naranja",
      "Café con leche sin lactosa"
  ],
  lunch: [
      "Pescado azul a la parrilla con limón y albahaca",
      "Arroz integral con espinacas salteadas",
      "Mandarina",
      "Agua con gas"
  ],
  dinner: [
      "Pollo al horno con zanahorias y calabacín",
      "Ensalada de rúcula y tomate con aceite de oliva",
      "Melón",
      "Té de menta"
  ]
};

const diet_day5: Diet = {
  breakfast: [
      "Cereales de desayuno de espelta con leche de almendra",
      "Fresas",
      "Té de jengibre"
  ],
  lunch: [
      "Carne de cerdo asada con hierbas",
      "Quinoa con calabaza y pimiento rojo",
      "Kiwi",
      "Agua con gas"
  ],
  dinner: [
      "Huevos cocidos con espinacas y cilantro",
      "Tortitas de maíz",
      "Uvas",
      "Té verde"
  ]
};

const diet_day6: Diet = {
  breakfast: [
      "Galletas sin gluten con mantequilla sin lactosa",
      "Leche de arroz",
      "Banana",
      "Té de menta"
  ],
  lunch: [
      "Pechuga de pavo a la plancha",
      "Arroz con lechuga, pepino y zanahoria",
      "Naranja",
      "Agua con gas"
  ],
  dinner: [
      "Pescado blanco al vapor con espinacas",
      "Patata asada con rúcula",
      "Fresas",
      "Té de jengibre"
  ]
};

const diet_day7: Diet = {
  breakfast: [
      "Pan de avena con mantequilla sin lactosa",
      "Yogur sin lactosa con kiwi",
      "Café con leche sin lactosa"
  ],
  lunch: [
      "Carne de ternera estofada con zanahorias",
      "Polenta con calabacín y berenjena",
      "Mandarina",
      "Agua con gas"
  ],
  dinner: [
      "Huevos revueltos con espinacas y tomate",
      "Tortitas de arroz",
      "Melón",
      "Té verde"
  ]
};



const diets = [diet_day1, diet_day2, diet_day3, diet_day4, diet_day5, diet_day6, diet_day7];

diets.forEach(diet => {
  this.saveDiet(diet);
});

}
 
}
