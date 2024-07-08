import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Activity, BarChart2, Briefcase, Camera, CheckCircle, ChevronLeft, ChevronRight, Clock, Delete, Download, Edit, Eye, EyeOff, Flag, Loader, Plus, PlusCircle, Search, Settings, Share2, Trash2, User, Users, XCircle } from 'angular-feather/icons';

const icons = {

  Camera,
  User,
  Users,
  Flag,
  Clock,
  Activity,
  CheckCircle,
  Loader, 
  Edit,
  Trash2,
  PlusCircle,
  Briefcase,
  Share2,
  Download,
  Search,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Delete,
  Plus,
  XCircle,
  Settings,
  Eye,
  EyeOff
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
