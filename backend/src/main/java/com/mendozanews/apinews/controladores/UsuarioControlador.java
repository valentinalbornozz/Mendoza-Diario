package com.mendozanews.apinews.controladores;

import com.mendozanews.apinews.entidades.Usuario;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.servicios.UsuarioServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/usuario")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio us;

    @GetMapping("/listar")
    public List<Usuario> listaUsuarios() {
        try {
            List<Usuario> usuarios = us.listarUsuarios();
            System.out.println("Carga de usuarios");
            return usuarios;
        } catch (Exception e) {
            System.out.println("No carga los usuarios: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/{id}")
    public Usuario usuario(@PathVariable("id") String id) {
        try {
            Usuario usuario = us.getOne(id);
            return usuario;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/email/{email}")
    public Usuario usuarioPorEmail(@PathVariable("email") String email) {
        try {
            Usuario usuario = us.buscarPorEmail(email);
            return usuario;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/username/{nombreUsuario}")
    public Usuario usuarioPorUsername(@PathVariable("nombreUsuario") String nombreUsuario) {
        try {
            Usuario usuario = us.buscarPorNombreUsuario(nombreUsuario);
            return usuario;
        } catch (Exception e) {
            return null;
        }
    }

    // @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestParam String nombre, @RequestParam String apellido,
            @RequestParam String nombreUsuario, @RequestParam MultipartFile imagen, @RequestParam String email,
            @RequestParam String telefono, @RequestParam String password, @RequestParam String password2) {
        try {
            us.cargarUsuario(nombre, apellido, nombreUsuario, imagen, email, telefono, password, password2);
            return ResponseEntity.ok("Exito al cargar el usuario");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cargar el usuario: " + ex.getMessage());
        }
    }

    @PostMapping("/editar/{id}")
    public ResponseEntity<String> editar(@PathVariable("id") String id, @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String nombreUsuario, @RequestParam MultipartFile imagen, @RequestParam String email,
            @RequestParam String telefono, @RequestParam String password, @RequestParam String password2) {
        try {
            us.editarUsuario(id, nombre, apellido, nombreUsuario, imagen, email, telefono, password, password2);
            return ResponseEntity.ok("Exito al editar el usuario");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cargar el usuario: " + ex.getMessage());
        }
    }

    @PostMapping("/modificarRol/{id}")
    public ResponseEntity<String> cambiarRol(@PathVariable("id") String id, @RequestParam String rol) {
        try {
            us.cambiarRol(id, rol);
            return ResponseEntity.ok("Exito al cambiar rol usuario");
        } catch (MiException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al modificar rol de usuario: " + e.getMessage());
        }
    }

    @PostMapping("/alta/{id}")
    public ResponseEntity<String> cambiarAlta(@PathVariable("id") String id) {
        try {
            us.altaUsuarioId(id);
            return ResponseEntity.ok("Exito al cambiar rol usuario");
        } catch (MiException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al modificar rol de usuario: " + e.getMessage());
        }
    }

    @PostMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable("id") String id) throws MiException {
        try {
            us.eliminarUsuarioId(id);
            return ResponseEntity.ok("Exito al eliminar el usuario");
        } catch (MiException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al eliminar el usuario: " + ex.getMessage());
        }
    }

}
