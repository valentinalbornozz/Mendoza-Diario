package com.mendozanews.apinews.servicios;

import com.mendozanews.apinews.SecurityConfig;
import com.mendozanews.apinews.entidades.Imagen;
import com.mendozanews.apinews.entidades.Usuario;
import com.mendozanews.apinews.enums.Rol;
import com.mendozanews.apinews.excepciones.MiException;
import com.mendozanews.apinews.repositorios.UsuarioRepositorio;

import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UsuarioServicio implements UserDetailsService {

    @Autowired
    UsuarioRepositorio ur;

    @Autowired
    ImagenServicio is;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CARGA UN USUARIO
    @Transactional
    public void cargarUsuario(String nombre, String apellido, String nombreUsuario,
            MultipartFile imagen, String email, String telefono, String password, String password2) throws MiException {

        validar(nombre, apellido, email, nombreUsuario, telefono, password, password2);

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setNombreUsuario(nombreUsuario);
        usuario.setTelefono(telefono);
        usuario.setPassword(new BCryptPasswordEncoder().encode(password));
        usuario.setRol(Rol.USUARIO);
        usuario.setAlta(true);
        Date fechaRegistro = new Date();
        usuario.setFechaAlta(fechaRegistro);
        Imagen foto = is.guardar(imagen);
        usuario.setImagen(foto);
        ur.save(usuario);
    }

    // MODIFICA UN USUARIO
    @Transactional
    public void editarUsuario(String id, String nombre, String apellido, String nombreUsuario,
            MultipartFile imagen, String email, String telefono, String password, String password2) throws MiException {

        validar(nombre, apellido, email, nombreUsuario, telefono, password, password2);

        Optional<Usuario> respuesta = ur.findById(id);

        if (respuesta.isPresent()) {

            Usuario usuario = respuesta.get();

            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
            usuario.setEmail(email);
            usuario.setNombreUsuario(nombreUsuario);
            usuario.setPassword(new BCryptPasswordEncoder().encode(password));
            usuario.setTelefono(telefono);

            String idImg = null;
            if (usuario.getImagen() != null) {
                idImg = usuario.getImagen().getId();
            }
            Imagen foto = is.actualizar(imagen, idImg);
            usuario.setImagen(foto);

            ur.save(usuario);
        }
    }

    // LISTA TODOS LOS USUARIOS
    public List<Usuario> listarUsuarios() {
        List<Usuario> noticias = ur.findAll();
        return noticias;
    }

    // OBTIENE UN USUARIO POR ID
    public Usuario getOne(String id) {
        return ur.getReferenceById(id);
    }

    // BUSCA USUARIO POR EMAIL
    public Usuario buscarPorEmail(String email) {
        Usuario usuario = ur.buscarPorEmail(email);
        return usuario;
    }

    // BUSCA USUARIO POR NOMBRE DE USUARIO
    public Usuario buscarPorNombreUsuario(String nombreUsuario) {
        Usuario usuario = ur.buscarPorNombreUsuario(nombreUsuario);
        return usuario;
    }

    // ELIMINA USUARIO POR ID
    @Transactional
    public void eliminarUsuarioId(String id) throws MiException {
        Optional<Usuario> respuesta = ur.findById(id);
        if (respuesta.isPresent()) {
            ur.deleteById(id);
        } else {
            throw new MiException("No se encontro el usuario");
        }
    }

    // CAMBIA ALTA UN USUARIO POR ID
    @Transactional
    public void altaUsuarioId(String id) throws MiException {
        Optional<Usuario> respuesta = ur.findById(id);
        if (respuesta.isPresent()) {
            Usuario usuario = respuesta.get();
            boolean estado = usuario.getAlta();
            usuario.setAlta(!estado);
            ur.save(usuario);
        } else {
            throw new MiException("No se encontro el usuario");
        }
    }

    // CAMBIA ROL DE USUARIO
    @Transactional
    public void cambiarRol(String id, String rol) throws MiException {
        Optional<Usuario> respuesta = ur.findById(id);
        rol = rol.toUpperCase();
        if (respuesta.isPresent()) {
            Usuario usuario = respuesta.get();
            usuario.setRol(Rol.valueOf(rol));
            ur.save(usuario);
        } else {
            throw new MiException("No se encontro el usuario");
        }
    }

    // VALIDA EL USUARIO POR EMAIL
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = ur.buscarPorEmail(email);
        System.out.println(usuario.toString());

        if (usuario != null) {
            List<GrantedAuthority> permisos = new ArrayList();
            GrantedAuthority p = new SimpleGrantedAuthority("ROLE_" + usuario.getRol().toString());
            permisos.add(p);
            ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
            HttpSession session = attr.getRequest().getSession();
            session.setAttribute("usuariosession", usuario);
            return new User(usuario.getEmail(), usuario.getPassword(), permisos);
        } else {
            System.out.println("Error en load user by username");
            return null;
        }
    }

    // VALIDA LOS DATOS DE ENTRADA
    private void validar(String nombre, String apellido, String email, String nombreUsuario, String telefono,
            String password, String password2) throws MiException {

        if (nombre.isEmpty() || nombre == null) {
            throw new MiException("EL nombre no puede estar vacio.");
        }
        if (apellido.isEmpty() || apellido == null) {
            throw new MiException("EL apellido no puede estar vacio.");
        }
        if (email.isEmpty() || email == null) {
            throw new MiException("EL email no puede estar vacio.");
        }
        if (nombreUsuario.isEmpty() || nombreUsuario == null) {
            throw new MiException("EL nombreUsuario no puede estar vacio.");
        }
        if (telefono.isEmpty() || telefono == null) {
            throw new MiException("El telefono no puede estar vacio.");
        }
        if (password.isEmpty() || password == null || password.length() <= 5) {
            throw new MiException("La contraseña no puede estar vacia y tiene que tener mas de 5 caracteres.");
        }
        if (!password.equals(password2)) {
            throw new MiException("Las contraseñas no coiciden.");
        }

    }

    @Transactional
    public void usuarioAdmin() throws MiException {
        try {
            Usuario usuario = new Usuario();
            usuario.setNombre("admin");
            usuario.setApellido("admin");
            usuario.setEmail("admin@admin");
            usuario.setNombreUsuario("admin");
            usuario.setTelefono("123456789");
            usuario.setPassword(new BCryptPasswordEncoder().encode("123456"));
            usuario.setRol(Rol.ADMIN);
            usuario.setAlta(true);
            Date fechaRegistro = new Date();
            usuario.setFechaAlta(fechaRegistro);
            usuario.setImagen(null);
            ur.save(usuario);
        } catch (Exception e) {
            throw new MiException("Error al crear el admin");
        }

    }

    public void configure(SecurityConfig securityConfig, AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this)
                .passwordEncoder(securityConfig.passwordEncoder());
    }

    @Transactional
    public void login(String nombre, String password) throws MiException {
        Usuario usuario = buscarPorNombreUsuario(nombre);

        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {
            // Autenticación exitosa
            // Puedes almacenar detalles de autenticación o tokens aquí
        } else {
            // Autenticación fallida
            throw new MiException("Usuario o contraseña incorrectos");
        }
    }
}
