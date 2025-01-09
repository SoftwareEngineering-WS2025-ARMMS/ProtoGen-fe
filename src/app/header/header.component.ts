import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Keycloak from 'keycloak-js';
@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userInfo: { username: string; organization: string } | null = null;
  logo_url = '';
  constructor(private readonly keycloak: Keycloak) {}

  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      const profile = await this.keycloak.loadUserProfile();
      const organizationInfo = this.keycloak.tokenParsed?.['organization_info'];

      //let organizationId = 'Unknown ID';
      let organizationName = 'Unknown Organization';

      if (organizationInfo) {
        const orgKey = Object.keys(organizationInfo)[0]; // Get the first key dynamically
        const orgData = organizationInfo[orgKey]; // Access the data under the dynamic key
        //organizationId = orgData?.id || organizationId;
        organizationName = orgData?.Name?.[0] || organizationName;
        this.logo_url = orgData?.logo_url?.[0];
      }

      this.userInfo = {
        username: `${profile?.firstName} ${profile.lastName}`,
        organization: `${organizationName}`,
      };
    }
  }
}
