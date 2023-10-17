package com.mendozanews.apinews.mappers;

import com.mendozanews.apinews.dtos.SignUpDto;
import com.mendozanews.apinews.dtos.UserDto;
import com.mendozanews.apinews.entites.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}
