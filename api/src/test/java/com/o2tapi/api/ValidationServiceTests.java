package com.o2tapi.api;

import com.o2tapi.api.exceptions.EntityNotFound;
import com.o2tapi.api.exceptions.InvalidFieldFormat;
import com.o2tapi.api.models.Label;
import com.o2tapi.api.models.User;
import com.o2tapi.api.repository.LabelRepository;
import com.o2tapi.api.repository.UserRepository;
import com.o2tapi.api.repository.WorkoutRepository;
import com.o2tapi.api.service.impl.ValidationServiceImpl;

import jakarta.persistence.EntityNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class ValidationServiceTests {

    @InjectMocks
    private ValidationServiceImpl validationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LabelRepository labelRepository;

    @Mock
    private WorkoutRepository workoutRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void validatePasswordField_ShouldThrowException_WhenPasswordIsTooShort() {
        // Teste de Senha Curta (Valor Limite): Verifica se uma exceção é lançada quando a senha não atende ao comprimento mínimo de 8 caracteres.
        String shortPassword = "1234567";
        assertThrows(InvalidFieldFormat.class, () -> validationService.validatePasswordField(shortPassword));
    }

    @Test
    void validatePasswordField_ShouldNotThrowException_WhenPasswordIsValid() {
        // Teste de Senha Válida (Valor Limite): Verifica o funcionamento do caso de sucesso, ou seja, senha atendendo o mínimo de 8 caracteres.
        String validPassword = "12345678";
        assertDoesNotThrow(() -> validationService.validatePasswordField(validPassword));
    }

    @Test
    void validatePasswordField_ShouldNotThrowException_WhenPasswordIsLongEnough() {
        // Teste de Senha Longa (Classe de Equivalência): Verifica o funcionamento de outro caso de sucesso, ou seja, senha com mais de 8 caracteres.
        String longPassword = "123456789";
        assertDoesNotThrow(() -> validationService.validatePasswordField(longPassword));
    }

    @Test
    void validateUser_ShouldThrowException_WhenUserNotFound() {
        // Teste de Usuário Não Encontrado (Classe de Equivalência): Verifica se uma exceção é lançada quando o usuário não é encontrado no Banco de Dados.
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> validationService.validateUser(userId));
    }

    @Test
    void validateUser_ShouldReturnUser_WhenUserExists() {
        // Teste de Usuário Encontrado (Classe de Equivalência): Verifica se o usuário é retornado quando encontrado no Banco de Dados.
        Long userId = 1L;
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        assertEquals(user, validationService.validateUser(userId));
    }

    @Test
    void validateEmail_ShouldThrowException_WhenEmailNotFound() {
        // Teste de Email Não Encontrado (Classe de Equivalência): Verifica se uma exceção é lançada quando o email não está registrado.
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        assertThrows(EntityNotFound.class, () -> validationService.validateEmail(email));
    }

    @Test
    void validateEmail_ShouldReturnUser_WhenEmailExists() {
        // Teste de Email Encontrado (Classe de Equivalência): Verifica se o usuário é retornado quando o email está registrado.
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        assertEquals(user, validationService.validateEmail(email));
    }

    @Test
    void validateNotEmptyFields_ShouldThrowException_WhenFieldIsEmpty() {
        // Teste de Campo Vazio (Classe de Equivalência): Verifica se uma exceção é lançada quando algum campo está vazio.
        String[] fields = {"field1", ""};
        assertThrows(InvalidFieldFormat.class, () -> validationService.validateNotEmptyFields(fields));
    }

    @Test
    void validateNotEmptyFields_ShouldNotThrowException_WhenFieldsAreNotEmpty() {
        // Teste de Campos Não Vazios (Classe de Equivalência): Garante que nenhuma exceção é lançada quando todos os campos são preenchidos.
        String[] fields = {"field1", "field2"};
        assertDoesNotThrow(() -> validationService.validateNotEmptyFields(fields));
    }

    @Test
    void validateColorFormat_WhenFormatIsNotHexadecimal() {
        // Teste de Formato de Cor Inválido (Classe de Equivalência): Verifica se o formato da cor é inválido quando não é hexadecimal.
        String invalidColor = "green";
        boolean result = validationService.isValidColorFormat(invalidColor);
        assertFalse(result);
    }

    @Test
    void validateColorFormat_WhenFormatIsNotAToF() {
        // Teste de Formato de Cor Inválido (Classe de Equivalência/Valor Limite): Verifica se o formato da cor é inválido quando contém caracteres fora do intervalo hexadecimal (A-F).
        String invalidColor = "#174a6g";
        boolean result = validationService.isValidColorFormat(invalidColor);
        assertFalse(result);
    }

    @Test
    void validateColorFormat_WhenFormatIsValid() {
        // Teste de Formato de Cor Válido (Classe de Equivalência): Verifica se o formato da cor é válido quando está no formato hexadecimal correto.
        String validColor = "#174a6f";
        boolean result = validationService.isValidColorFormat(validColor);
        assertTrue(result);
    }

    @Test
    void testIsLabelNameUnique_NotUniqueAndNotIsUpdate() {
        // Teste de Nome de Label Não Único (Classe de Equivalência): Verifica o caso onde o nome da label não é único e não é uma atualização.
        User testUser = new User();
        Label label1 = new Label();
        Label label2 = new Label();

        label1.setName("label1");
        label2.setName("label2");

        List<Label> labels = Arrays.asList(label1, label2);

        when(labelRepository.findAllByCreatedBy(testUser)).thenReturn(labels);

        boolean result = validationService.isLabelNameUnique("label1", testUser, false);

        assertFalse(result);
    }

    @Test
    void testIsLabelNameUnique_IsUnique() {
        // Teste de Nome de Label Único (Classe de Equivalência): Verifica o caso onde o nome da label é único (independente de ser uma atualização ou não).
        User testUser = new User();
        Label label1 = new Label();
        Label label2 = new Label();

        label1.setName("label1");
        label2.setName("label2");

        List<Label> labels = Arrays.asList(label1, label2);

        when(labelRepository.findAllByCreatedBy(testUser)).thenReturn(labels);

        boolean result = validationService.isLabelNameUnique("label3", testUser, true);

        assertTrue(result);
    }

    @Test
    void validateFieldLength_ShouldNotThrowException_WhenFieldIsNull() {
        // Teste de Campo Nulo (Classe de Equivalência): Verifica se exceção não é lançada quando o campo é nulo.
        String field = null;
        String fieldName = "testField";
        int maxLength = 10;

        assertDoesNotThrow(() -> validationService.validateFieldLength(field, fieldName, maxLength));
    }

    @Test
    void validateFieldLength_ShouldThrowException_WhenFieldLengthIsFarExceedingMaxLength() {
        // Teste de Campo Excedendo Comprimento Máximo (Classe de Equivalência): Verifica se exceção é lançada quando o campo excede o comprimento máximo permitido.
        String field = "12345678901"; 
        String fieldName = "testField";
        int maxLength = 10;

        assertThrows(InvalidFieldFormat.class, () -> validationService.validateFieldLength(field, fieldName, maxLength));
    }

    @Test
    void validateFieldLength_ShouldNotThrowException_WhenFieldLengthIsAtMaxLength() {
        // Teste de Campo com Comprimento no Limite (Valor Limite): Verifica se exceção não é lançada quando o campo tem o comprimento máximo permitido.
        String field = "1234567890";
        String fieldName = "testField";
        int maxLength = 10;

        assertDoesNotThrow(() -> validationService.validateFieldLength(field, fieldName, maxLength));
    }
}
