import { Component, model, signal } from '@angular/core';
import { SmartSectionComponent } from '../smart-section/smart-section.component';
import { Image } from 'primeng/image';
import { LanguageResponseDTO, ProgrammingLanguageResponseDTO, UserResponseDTO } from '../../../api';
import { ChipsListComponent } from '../chips-list/chips-list.component';

@Component({
    selector: 'app-personnal-infos',
    imports: [SmartSectionComponent, Image, ChipsListComponent],
    templateUrl: './personnal-infos.component.html',
    styleUrl: './personnal-infos.component.scss'
})
export class PersonnalInfosComponent {
    user = signal<UserResponseDTO>({
        id: '',
        firstName: 'John',
        lastName: 'Wick',
        email: 'john.wick@example.com',
        description:
            ' Distinctio nam aspernatur. Sapiente fugiat, tempora iste necessitatibus doloremque rem amet deserunt voluptas error assumenda reprehenderit quidem. Cupiditate porro quibusdam, ea reprehenderit deleniti earum modi minima voluptatibus, non sequi laudantium iste vero ullam aperiam. Nam, error consequatur dolor suscipit beatae repellat deleniti, minus obcaecati possimus quam cum reiciendis iure recusandae. Sed hic vitae assumenda consequuntur et quis illum deleniti neque error. Qui consectetur ut, voluptatem harum nulla tenetur nostrum eveniet sunt eum officiis ipsam quae eos voluptate ipsum numquam quis minima quas consequuntur explicabo est modi atque fuga vero cum. Recusandae maxime laboriosam illum quaerat molestias pariatur, voluptates harum, dicta aspernatur illo exercitationem quisquam suscipit esse perspiciatis aliquam excepturi ab quibusdam, dolorum aut explicabo! Consequuntur rem facilis dolorem distinctio accusamus ipsum consectetur eos necessitatibus nobis maiores commodi tempore incidunt officiis blanditiis, nihil culpa ea quasi magni? Suscipit a, accusantium officiis officia porro ullam alias aspernatur perspiciatis blanditiis provident magnam? Dicta, modi repellendus illo quos magnam consectetur similique quam voluptatum quia eius ipsam consequatur provident hic perspiciatis nesciunt at suscipit neque soluta aspernatur voluptate. Quaerat molestiae consequatur debitis quidem nulla blanditiis recusandae pariatur, dolore illum amet ad at perferendis provident corporis!',

        roles: ['User']
    });

    programmingLanguages = signal<ProgrammingLanguageResponseDTO[]>([
        {
            id: '1',
            name: 'JavaScript',
            icon: 'pi pi-code',
            color: '#F7DF1E',
            description: 'JavaScript is a versatile programming language commonly used for web development.',
            createdAt: new Date()
        },
        {
            id: '2',
            name: 'Python',
            icon: 'pi pi-code',
            color: '#F7DF1E',
            description: 'Python is a high-level programming language known for its readability and versatility.',
            createdAt: new Date()
        },
        {
            id: '3',
            name: 'C#',
            icon: 'pi pi-globe',
            description: 'C# is a modern, object-oriented programming language developed by Microsoft for building a variety of applications.',
            color: '#1ea0f7ff',

            createdAt: new Date()
        },
        {
            id: '4',
            name: 'C++',
            icon: 'pi pi-globe',
            description: 'C++ is a powerful programming language used for system/software development and game programming.',
            color: '#2c6cf7ff',
            createdAt: new Date()
        }
    ]);
}
