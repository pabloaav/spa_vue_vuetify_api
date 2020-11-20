<template>
  <div class="home pa-4">
    <v-divider></v-divider>
    <v-card max-width="475" class="mx-auto">
      <v-list subheader flat>
        <v-subheader>Listas de tareas To Do...</v-subheader>
        <v-divider></v-divider>
        <v-list-item
          v-for="tarea in tareas"
          :key="tarea.id"
          @click="doneTask(tarea.id)"
          :class="{ 'blue lighten-5': tarea.done }"
        >
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': tarea.done }"
              >
                {{ tarea.description }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <!-- Le pasamos a la propiedad  :input-value el valor "tareas.done" segun sea nuestra data en el array tareas -->
              <v-checkbox
                :input-value="tarea.done"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // pongo un array de tareas
      tareas: [
        {
          id: 1,
          description: "Levantarse",
          done: false,
        },
        { id: 2, description: "Rezar", done: false },
        { id: 3, description: "Ejercitar", done: false },
      ],
    };
  },
  methods: {
    doneTask(id) {
      let tarea = this.tareas.filter((tarea) => tarea.id === id)[0];
      tarea.done = !tarea.done;
      // console.log(tarea.done);
    },
  },
};
</script>
