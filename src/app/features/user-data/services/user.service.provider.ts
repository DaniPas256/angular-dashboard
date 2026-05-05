import { USER_STORE } from "./user.service.token";
import { createUsersServiceStore } from "./user.service.store";
import { inject, Injector, runInInjectionContext } from "@angular/core";

export function provideUserStore() {
    return {
        provide: USER_STORE,
        useFactory: () => {
            const injector = inject(Injector);

            return runInInjectionContext( injector, () => {
                return createUsersServiceStore()
            })
        }
    }
}