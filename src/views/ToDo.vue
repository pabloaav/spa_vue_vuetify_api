<template>
  <div class="home pa-4">
    <!-- El v-model es el que permite vincular el valor que se pone en el campo de texto con la variable del mism nombre en la seccion data() -->
    <!-- @click:append="addTask" ejecuta ese metodo. es el mas o cruz de nueva tarea -->
    <!-- @keyup.enter="addTask" hace que al presionar enter se ejecute adherir tarea -->
    <v-text-field
      v-model="newTask"
      @click:append="addTaskToDb"
      @keyup.enter="addTaskToDb"
      class="pa-2"
      outlined
      label="Nueva Tarea"
      append-icon="mdi-plus"
      hide-details=""
      clearable
    ></v-text-field>
    <v-divider></v-divider>
    <v-card max-width="475" class="mx-auto">
      <v-list subheader flat>
        <v-subheader v-if="tareas.length > 0"
          >Listas de tareas To Do...</v-subheader
        >
        <v-subheader v-else>
          Excelente! no tienes tareas por hacer. Agregalas aqui...</v-subheader
        >
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
            <!-- el boton de eliminar -->
            <v-list-item-action>
              <!-- con stop detenemos que tome como que se hizo click en todo el componente padre o elemento padre -->
              <v-btn @click.stop="mostrarDialog" icon>
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Dialogo emergente para dar por seguro el borrado -->
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title>
          Vas a eliminar la tarea?
        </v-card-title>
        <v-card-text>
          Si optas por aceptar, tu tarea se borrará de la base de
          datos</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ------ fin del dialog -------- -->
  </div>
</template>

<script>
//hacemos un import de la constante db para manejar firebase:
import { db } from "../firebase/db";

export default {
  name: "Home",
  data() {
    return {
      //la data del campo de texto que agrega tareas
      newTask: "",
      // pongo un array de tareas
      tareas: [
        //esto es la forma estatica de probar datos en el array
        /*  {
          id: 1,
          description: "Deployando en GitHub Pages",
          done: false,
        }, */
      ],
      //la propiedad que activa o no el dialog de eliminar tareas
      dialog: false,
    };
  },
  methods: {
    /**
     * addTAsk agrega una nueva tarea
     */
    addTask() {
      let nuevaTarea = {
        id: Date.now(),
        description: this.newTask,
        done: false,
      };
      // cargamos el objeto al array tareas que esta en data()
      this.tareas.push(nuevaTarea);
      this.newTask = "";
    },
    /**
     * metodo que cambia el check de la tarea y modifica en db el valor del campo done
     */
    doneTask(id) {
      let tarea = this.tareas.filter((tarea) => tarea.id === id)[0];
      tarea.done = !tarea.done;
      //Modificar en la db la tarea como hecha
      let tareaHecha = db.collection("ToDos").doc(id);

      return tareaHecha
        .update({
          done: tarea.done,
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      // console.log(tarea.id);
    },
    /**
     * metodo que filtra la data para que se quite la tarea que se quiere eliminar.
     * Adicionalmente, borramos de la base de datos la tarea
     */
    deleteTask(id) {
      this.tareas = this.tareas.filter((tarea) => tarea.id !== id);

      //procedesmos a borrar de la db
      let tareaBorrar = db.collection("ToDos").doc(id);

      //Para hacer mejor lectura del codigo, guardamos en una variable la referencia a la tarea (document en firestore), que queremos borrar para luego aplicar la funcion de borrado. Puede ser todo en una linea como plantea la documentacion pero es menos legible:
      tareaBorrar
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    /**
     * para subir a la db de firebase
     */
    // se le debe porne la propiedad async
    async addTaskToDb() {
      if (this.newTask) {
        //lo que va entre aprentesis es el nombre de la coleccion
        await db
          .collection("ToDos")
          .add({ description: this.newTask, done: false });
        this.newTask = "";
      }
    },
    mostrarDialog() {
      this.dialog = true;

      console.log(this.tareas);
    },
  }, //fin de methods
  // Se pone una referencia a la db como propiedad de export default, para vincular el array de tareas con la DB y que sea dinamico:
  firestore: {
    tareas: db.collection("ToDos"),
  },
};
</script>
