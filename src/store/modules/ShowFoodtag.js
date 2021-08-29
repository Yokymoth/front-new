import axios from "axios";
// import { vm } from '@/main'

const showFoodtag = {
  namespaced: true,
  state: {
    id:'',
    foodtag: [],
    selectTag:[],
  },
  getters: {
  },
  mutations: {
    LOAD_foodtag : (state, foodtag) =>{
        state.foodtag = foodtag;
      },
      LOAD_Selectfoodtag : (state, selectTag) =>{
        state.selectTag = selectTag;
      }
},
  actions: { 
//    async loadDetailByID({ commit }, id) {
      // const id = getters.findRecipeID;
//      await axios
//        .get(`${process.env.VUE_APP_BACKEND}/api/find/recipe/`+ id ) 
//        .then((response) => {
//          commit("LOAD_DETAIL", response.data);
//          console.log(response.data);
//        })
//        .catch((error) => console.log(error));  
//    },
      async loadFoodtag({ commit }) {
        await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/foodtag`) 
        .then((response) => {
          commit("LOAD_foodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
      },
      async selectFoodTag({ commit }, selectTag) {
        console.log("selectFoodTag")
        await axios
          .post('http://localhost:3000/api/cooking_process/createProcess',selectTag)
          .then((response) => {
            commit("LOAD_Selectfoodtag", response.data);
            console.log(response.data);
          })
          .catch((error) => console.log(error.response.data));
      },
},
};

export default showFoodtag;
