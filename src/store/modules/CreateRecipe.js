import axios from "axios";

const createRecipe = {
    namespaced: true,
    state: {
      id:'',
      recipe: {}, 
      foodtag: [],
      mIngredients: [],
      sIngredients:[],
      flavoring:[],
      processes: [],
    },
    getters: {
      getRecipes: (state) => state.recipe,
      findUserID: (state) => state.id,
    },
    mutations: {
      SET_Detail: (state, recipe) => {
        state.recipe = recipe;
      },

      SET_MIngredients : (state, mIngredients) =>{
        state.mIngredients = mIngredients;
      },
      SET_cookingprocess : (state, processes) =>{
        state.processes = processes;
      },
      SET_SIngredients : (state, sIngredients)=>{
        state.sIngredients = sIngredients;
      },
      SET_Flavoring : (state, flavoring)=>{
        state.flavoring = flavoring;
      },
      StoreUserId:(state,id) => {
        state.id = id;
      }
      

    },
    actions: {
      async StoreUserID({commit},id){
        commit("StoreUserId",id);
      },
      async CreateDetail({ commit, getters }, recipe) {
        const id = getters.findUserID;
        await axios
          .post(`${process.env.VUE_APP_BACKEND}/api/recipe/create/${id}`,{
            'shareOption' : recipe.shareOption,
            'recipeName' : recipe.recipeName,
            'description' : recipe.description,
            'time' : recipe.time,
            'serveNumber' : recipe.serveNumber,
            'image' : recipe.image,
            
          })
          .then((response) => {
            commit("SET_Detail", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },

      //Cooking Process
      async CreateCookingprocess({ commit }, processes) {
        console.log("Cooking Process")
        await axios   
          .post(`${process.env.VUE_APP_BACKEND}/api/cooking_process/createProcess`,processes)
          .then((response) => {
            commit("SET_cookingprocess", response.data);
            console.log(response.data);
          })
          .catch((error) => console.log(error.response.data));
      },
      //Main
      async CreateMainIngredients({ commit }, mIngredients) {
        console.log(mIngredients);   
        await axios        
          .post(`${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredients`,mIngredients)
          .then((response) => {
            commit("SET_MIngredients", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
      //Sub
      async CreateSubIngredients({ commit }, sIngredients) {
        console.log(sIngredients);   
        await axios
          .post('http://localhost:3000/api/ingredient/createRecipeIngredients',sIngredients)
          .then((response) => {
            commit("SET_SIngredients", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
      //Flavoring
      async CreateFlavoring({ commit }, flavoring) {
        console.log(flavoring);   
        await axios
          .post('http://localhost:3000/api/ingredient/createRecipeIngredients',flavoring)
          .then((response) => {
            commit("SET_Flavoring", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
    }
  };
  export default createRecipe;
  