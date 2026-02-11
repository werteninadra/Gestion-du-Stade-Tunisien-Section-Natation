import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface ReservationPack {
    id: number;
    name: string;
    description: string;
    price: number;
    sessions: number;
    duration: string;
    features: string[];
    icon: string;
}

interface Coach {
    id: number;
    name: string;
    specialty: string;
    experience: string;
    photo: string;
    available: boolean;
}

@Component({
    selector: 'app-aqua-stade',
    templateUrl: './aqua-stade.component.html',
    styleUrls: ['./aqua-stade.component.scss']
})
export class AquaStadeComponent implements OnInit {
    packs: ReservationPack[] = [
        {
            id: 1,
            name: 'Pack Débutant',
            description: 'Ideal pour débutants',
            price: 150,
            sessions: 8,
            duration: '1 mois',
            features: ['Accès piscine', 'Cours collectifs', 'Équipement inclus'],
            icon: 'water'
        },
        {
            id: 2,
            name: 'Pack Confirmé',
            description: 'Pour swimmers confirmés',
            price: 250,
            sessions: 16,
            duration: '2 mois',
            features: ['Accès piscine', 'Cours collectifs avancés', 'Équipement inclus', 'Suivi personnalisé'],
            icon: 'timer'
        },
        {
            id: 3,
            name: 'Pack Elite',
            description: 'Entraînement professionnel',
            price: 400,
            sessions: 24,
            duration: '3 mois',
            features: ['Accès illimité', 'Cours privés', 'Équipement premium', 'Suivi personnalisé', 'Compétitions'],
            icon: 'trophy'
        }
    ];

    coaches: Coach[] = [
        {
            id: 1,
            name: 'Mohamed Ali',
            specialty: 'Natation compétition',
            experience: '15 ans',
            photo: 'assets/images/coaches/coach1.svg',
            available: true
        },
        {
            id: 2,
            name: 'Fatima Benali',
            specialty: 'Aquagym & Fitness',
            experience: '10 ans',
            photo: 'assets/images/coaches/coach1.svg',
            available: true
        },
        {
            id: 3,
            name: 'Youssef Karim',
            specialty: 'Enfants & Adolescents',
            experience: '8 ans',
            photo: 'assets/images/coaches/coach1.svg',
            available: false
        },
        {
            id: 4,
            name: 'Amira Hachmi',
            specialty: 'Natation thérapeutique',
            experience: '12 ans',
            photo: 'assets/images/coaches/coach1.svg',
            available: true
        }
    ];

    isScrolled = false;

    constructor(private _router: Router) {}

    ngOnInit(): void {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
    }

    // Ajoutez cette méthode pour corriger l'erreur
    scrollToPacks(): void {
        const element = document.getElementById('packs');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    scrollToContact(): void {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    navigateToLogin(): void {
        this._router.navigate(['/sign-in']);
    }

    navigateToRegister(): void {
        this._router.navigate(['/sign-up']);
    }

    selectPack(pack: ReservationPack): void {
        console.log('Selected pack:', pack.name);
        // Navigate to login or booking page
        this._router.navigate(['/sign-in']);
    }

    bookSession(coach: Coach): void {
        console.log('Booking session with:', coach.name);
        this._router.navigate(['/sign-in']);
    }

    // Méthode pour naviguer vers l'accueil (scroll vers le haut)
    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}