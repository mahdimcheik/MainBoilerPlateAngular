import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurableFormComponent } from './configurable-form.component';

describe('ConfigurableFormComponent', () => {
    let component: ConfigurableFormComponent;
    let fixture: ComponentFixture<ConfigurableFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfigurableFormComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ConfigurableFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Password Toggle Functionality', () => {
        it('should initialize password visibility as false', () => {
            const fieldId = 'test-password-field';
            expect(component.isPasswordVisible(fieldId)).toBeFalse();
        });

        it('should toggle password visibility', () => {
            const fieldId = 'test-password-field';

            // Initially should be false
            expect(component.isPasswordVisible(fieldId)).toBeFalse();

            // Toggle to true
            component.togglePasswordVisibility(fieldId);
            expect(component.isPasswordVisible(fieldId)).toBeTrue();

            // Toggle back to false
            component.togglePasswordVisibility(fieldId);
            expect(component.isPasswordVisible(fieldId)).toBeFalse();
        });

        it('should return correct input type based on visibility state', () => {
            const fieldId = 'test-password-field';

            // When hidden, should return 'password'
            expect(component.getPasswordFieldType(fieldId)).toBe('password');

            // When visible, should return 'text'
            component.togglePasswordVisibility(fieldId);
            expect(component.getPasswordFieldType(fieldId)).toBe('text');
        });

        it('should handle multiple password fields independently', () => {
            const fieldId1 = 'password-field-1';
            const fieldId2 = 'password-field-2';

            // Toggle first field
            component.togglePasswordVisibility(fieldId1);
            expect(component.isPasswordVisible(fieldId1)).toBeTrue();
            expect(component.isPasswordVisible(fieldId2)).toBeFalse();

            // Toggle second field
            component.togglePasswordVisibility(fieldId2);
            expect(component.isPasswordVisible(fieldId1)).toBeTrue();
            expect(component.isPasswordVisible(fieldId2)).toBeTrue();

            // Toggle first field back
            component.togglePasswordVisibility(fieldId1);
            expect(component.isPasswordVisible(fieldId1)).toBeFalse();
            expect(component.isPasswordVisible(fieldId2)).toBeTrue();
        });
    });
});
